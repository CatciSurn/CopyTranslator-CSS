const osType = require("os").type();
const osSpec = {
  Windows_NT: { iconName: "icon.ico" },
  Darwin: { iconName: "icon.png" },
  Linux: { iconName: "linux-icon" }
}[osType];

const trayIconName = "tray@2x.png";

module.exports = {
  pluginOptions: {
    electronBuilder: {
      mainProcessTypeChecking: false,
      builderOptions: {
        appId: "com.copytranslator.copytranslator",
        asar: true,
        extraResources: [
          {
            from: `dist_locales`,
            to: `locales`
          },
          {
            from: trayIconName,
            to: trayIconName
          },
          {
            from: osSpec.iconName,
            to: osSpec.iconName
          }
        ],
        win: {
          icon: osSpec.iconName,
          target: [
            {
              target: "nsis",
              arch: ["x64"]
            },
            {
              target: "zip",
              arch: ["x64"]
            }
          ]
        },
        linux: {
          target: [
            {
              target: "AppImage",
              arch: ["x64"]
            },
            {
              target: "deb",
              arch: ["x64"]
            },
            {
              target: "rpm",
              arch: ["x64"]
            }
          ],
          icon: osSpec.iconName,
          category: 'Education',
          // https://www.electron.build/configuration/linux#debian-package-options
          desktop: {
            Icon: '/opt/copytranslator/resources/linux-icon/icon.png'
          }
        },
        mac: {
          target: [
            {
              target: "default",
              arch: ["x64"]
            }
          ],
          icon: osSpec.iconName
        },
        nsis: {
          installerIcon: osSpec.iconName,
          oneClick: false,
          perMachine: false,
          allowToChangeInstallationDirectory: true,
          license: "readable_license.txt"
        }
      },
      externals: ["iohook", "shortcut-capture"],
      // 这一步还蛮重要的，不然就会报错
      nodeModulesPath: ["./node_modules"]
    }
  },
  configureWebpack: { 
    devtool: 'source-map'
  }
};
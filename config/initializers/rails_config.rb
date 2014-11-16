AppSettings.add_source!(FabrikaPrazdnikof::Engine.root.join('config', 'settings.yml').to_s)
AppSettings.add_source!(FabrikaPrazdnikof::Engine.root.join('config', 'settings.local.yml').to_s)

AppSettings.reload!
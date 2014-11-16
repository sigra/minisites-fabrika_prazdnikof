require 'dragonfly'

# Configure
Dragonfly.app.configure do
  plugin :imagemagick

  secret "e5ff5324eaad5e1fe4886951d5533da610e642bffa7ad43e3fd7135e1910a05d"

  url_format "/media/:job/:name"

  datastore :file,
    root_path: FabrikaPrazdnikof::Engine.root.join('public/dragonfly'),
    server_root: Rails.root.join('public/fabrika_prazdnikof')
end

# Logger
Dragonfly.logger = Rails.logger

# Mount as middleware
Rails.application.middleware.use Dragonfly::Middleware
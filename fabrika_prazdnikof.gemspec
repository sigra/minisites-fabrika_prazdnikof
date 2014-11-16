$:.push File.expand_path("../lib", __FILE__)

# Maintain your gem's version:
require "fabrika_prazdnikof/version"

# Describe your gem and declare its dependencies:
Gem::Specification.new do |s|
  s.name        = "minisites-fabrika_prazdnikof"
  s.version     = FabrikaPrazdnikof::VERSION
  s.authors     = ["Andrey Yakovlev"]
  s.email       = ["yakovlev.andr@gmail.com"]
  s.homepage    = "http://fabrika-prazdnikof.ru"
  s.summary     = "Landing page for Фабрика Праздников в Тольятти"
  s.description = "Landing page, administration panel, sqlite"
  s.license     = "MIT"

  s.files = Dir["{app,config,db,lib}/**/*", "MIT-LICENSE", "Rakefile", "README.rdoc"]
  s.test_files = Dir["test/**/*"]

  s.add_dependency "rails", "~> 4.1.7"
  s.add_dependency "rails_config"
  s.add_dependency "dragonfly"

  s.add_development_dependency "sqlite3"
end

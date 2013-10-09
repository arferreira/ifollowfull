require "bundler/capistrano"
require "rvm/capistrano"
require 'capistrano-unicorn'


set :application, '198.199.86.69'

set :keep_releases, 5

set :scm, :git

set :rvm_type, :system

ssh_options[:forward_agent] = true

default_run_options[:pty] = true

set :repository, 'git@github.com:arferreira/ifollowfull.git'

set :branch, 'master'

set :deploy_via, :remote_cache

set :user, "root"

set :use_sudo, false

set :deploy_to, '/home/ifollowfull'

set :current, "#{deploy_to}/current"

role :web, application
role :app, application
role :db,  application, primary: true

# Minhas configurações do Unicorn
# comando para execução do unicorn
# <optinal>
set :unicorn_binary,  "bundle exec unicorn"
# caminho para o arquivo de configuração do unicorn
# <optinal>
set :unicorn_config,  "#{current}/config/unicorn.rb"
# onde será armazenado o pid do processo do unicorn
# <optinal>
set :unicorn_pid,     "#{deploy_to}/shared/pids/unicorn.pid"


# executar antes do 'deploy:update_code' o comando 'deploy.check_folders'
# do capistrano
before 'deploy:update_code' do
  deploy.check_folders
end

after 'deploy:restart', 'unicorn:reload'    # app IS NOT preloaded
after 'deploy:restart', 'unicorn:restart'   # app preloaded
after 'deploy:restart', 'unicorn:duplicate' # before_fork hook implemented (zero downtime deployments)
#after "deploy:update", "deploy:cleanup" 

namespace :deploy do

desc "tail production log files" 
task :tail_logs, :roles => :app do
  trap("INT") { puts 'Interupted'; exit 0; }
  run "tail -f /var/www/pdtms/shared/production.log" do |channel, stream, data|
    puts  # for an extra line break before the host name
    puts "#{channel[:host]}: #{data}" 
    break if stream == :err
  end
end

  # verifica as pasta necessarias para o envio, e inicialização do s serviços
  # para corrigir bug que aconteceu comigo, talvez ja tenham corrigido esse erro
  desc "Creating folders necessary"
  task :check_folders do
    run "if [ ! -d '#{deploy_to}' ];then mkdir #{deploy_to}; fi"
    run "if [ ! -d '#{deploy_to}/#{version_dir}' ];then mkdir #{deploy_to}/#{version_dir}; fi"
    run "if [ ! -d '#{deploy_to}/#{shared_dir}' ];then mkdir #{deploy_to}/#{shared_dir}; fi"
    run "if [ ! -d '#{deploy_to}/#{shared_dir}/pids' ];then mkdir #{deploy_to}/#{shared_dir}/pids; fi"
    run "if [ ! -d '#{deploy_to}/#{shared_dir}/log' ];then mkdir #{deploy_to}/#{shared_dir}/log; fi"
  end
end

namespace :ruby do
  desc "Show ruby version"
  task :version do
    run "cd #{current_release} && ruby -v"
  end
  desc "List process (sla) on server"
  task :list do
    run "top"
  end
end

namespace :production do

desc "show log production"

task :log, :except => { :no_release => true } do

  run "cat #{deploy_to}/#{shared_dir}/log/production.log "

  end
end

namespace :releases do

desc "show releases"

task :view, :except => { :no_release => true } do

  run "ls /var/www/pdtms/releases "

  end
end


namespace :rake_routes do
desc "Run the super-awesome rake task"
task :executa do
  rake = fetch(:rake, 'rake')
  rails_env = fetch(:rails_env, 'production')

  run "cd '#{current_path}' && #{rake} routes RAILS_ENV=#{rails_env}"
end
end

namespace :unicorn do
  desc "Show error log"
  task :error_log, :except => { :no_release => true } do
    run "cat #{deploy_to}/#{shared_dir}/log/unicorn.stderr.log"
  end

  desc "Show out log"
  task :out_log, :except => { :no_release => true } do
    run "cat #{deploy_to}/#{shared_dir}/log/unicorn.stdout.log"
  end
end

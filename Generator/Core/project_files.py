#!/usr/bin/python
# -*- coding: utf-8 -*-

import json
import os
import shutil
from jinja2 import Template
import subprocess

def generateProjectFiles(file):
  # Open the configuration file
  with open('../IntegratedProjects/{}'.format(file), 'r', encoding="utf-8") as f_json:
    configuration = json.load(f_json)
    
    # Create project directory for the files
    try:
      os.mkdir('../ProjectFiles/{}'.format(configuration['name']))
    except:
      shutil.rmtree('../ProjectFiles/{}'.format(configuration['name']))
      os.mkdir('../ProjectFiles/{}'.format(configuration['name']))

    # Create user & pass auth git url
    auth_string='{{user}}:{{devopspass}}'
    respository_with_user = '{}{}@{}'.format(configuration['repository'][0:8], auth_string, configuration['repository'][8:])
    clone_name = configuration['repository'].split('/')[5].replace('.git', '')

    # Generate the playbooks
    for mode in configuration['aliases']:
      deploy_image = 'not-set'

      # The default mode is the pre or set the images
      if mode == 'default':
        mode = 'pre'
        deploy_image = 'ionic-dev'
      elif mode == 'staging':
        deploy_image = 'ionic-staging'
      elif mode == 'production':
        deploy_image = 'ionic-production'
      else:
        deploy_image = 'ionic-custom'

      # Generate the files for the mode
      with open('playbook.yaml.jinja') as f:
        tmpl = Template(f.read())
        playbook = tmpl.render(
          container_name=configuration['name'],
          deploy_image=deploy_image,
          repository=respository_with_user,
          site=configuration['sites'][mode],
          clone_name=clone_name,
          jenkins_name=configuration['name'],
          mode=mode,
          postfix='',
          folder=configuration['folder'])

        with open('../ProjectFiles/{}/{}.yaml'.format(configuration['name'], mode), 'x') as output:
          output.write(playbook)
          output.close()
          print('Created: {}.yaml'.format(mode))

  # Generate Jenkinsfile
  with open('jenkinsfile.jinja') as f:
    tmpl = Template(f.read())

    jenkins_aliases = configuration['aliases']
    jenkins_aliases[0] = 'pre'

    jenkins_aliases = jenkins_aliases[1:]

    jenkinsfile = tmpl.render(
      project_name=configuration['name'],
      clone_name=clone_name,
      pre_site= 'https://' + configuration['sites']['pre'] + '.web.app',
      sites=configuration['sites'],
      repository=configuration['repository'],
      folder=configuration['folder'],
      branch=configuration['branch'],
      jenkins_aliases=jenkins_aliases
    )

    with open('../ProjectFiles/{}/Jenkinsfile'.format(configuration['name']), 'x') as output:
      output.write(jenkinsfile)
      output.close()

  with open('./data.json', 'r') as data_json:
    integrated_projects = json.load(data_json)
    integrated_projects.append(file)
    new_data = open('./data.json', 'w')

    new_data.write(json.dumps(integrated_projects))
    new_data.close()
    data_json.close()

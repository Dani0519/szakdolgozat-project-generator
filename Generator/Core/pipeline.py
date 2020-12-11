#!/usr/bin/python
# -*- coding: utf-8 -*-

import json
import jenkins
from jinja2 import Template
import xml.etree.ElementTree as ET

def createPipeline(file):

  results = []
  viewResponseStatus = bool
  piperesponseStatus = bool

  # Open the configuration file
  with open('../IntegratedProjects/{}'.format(file), 'r', encoding="utf-8") as file_json:
    configuration = json.load(file_json)
    
    # Login to the Jenkins
    server = jenkins.Jenkins('')
    
    # Create the view for the pipeline
    try:
      server.create_view(configuration['jiraKey'], jenkins.EMPTY_VIEW_CONFIG_XML)
      viewResponseStatus = True
    except:
      viewResponseStatus = False
      print('{} view already exists!'.format(configuration['jiraKey']))

    # Create the configuration xml file for the pipeline
    with open('config.xml.jinja') as f:
      tmpl = Template(f.read())
      xml_file = tmpl.render(
          description=configuration['description'],
          path_to_jenkinsfile='{}/Jenkinsfile'.format(configuration['name']),
          branch=configuration['branch'],
          alias='default'
      )

      # Create pipeline
      try:
        try:
          server.create_job(configuration['name'], xml_file)
          piperesponseStatus = True
        except:
          piperesponseStatus = False
          print('Pipeline already exists! Recreating...')
          server.delete_job(configuration['name'])
          server.create_job(configuration['name'], xml_file)

        # Get the view configuration
        view_xml = server.get_view_config(configuration['jiraKey'])

        # Get the xml Element from raw xml string
        tree = ET.fromstring(view_xml)

        # Create a string SubElement with the pipeline name in the view
        ET.SubElement(tree[4], 'string').text = configuration['name']

        # Convert the ET object to string
        new_view_xml = ET.tostring(tree, 'unicode')

        # Update the view configuration with the new config xml
        server.reconfig_view(configuration['jiraKey'], new_view_xml)

        print('{} pipeline created successfuly!'.format(configuration['name']))
      except Exception as err:
        print(err)
  results.append(viewResponseStatus)
  results.append(piperesponseStatus)
  return results

      

from selenium import webdriver
from selenium.webdriver.firefox.options import Options
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities

from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as ec
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains
from selenium.common.exceptions import MoveTargetOutOfBoundsException

from time import sleep
import json
import sys

import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

config = {
  
}

cred = credentials.Certificate("./key.json")
firebase_admin.initialize_app(cred)

db = firestore.client()

datas = json.loads(sys.argv[1])

options = Options()
options.headless = True
options.add_argument('user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.102 Safari/537.36')
# options.add_argument('--no-sandbox')
# options.add_argument('--disable-gpu')
options.add_argument('--lang=en_US') 
options.add_argument('window-size=1920,1080')
#browser = webdriver.Chrome('./chromedriver', options=options, desired_capabilities=caps)
browser = webdriver.Firefox(executable_path='./geckodriver', options=options, firefox_binary='/tmp/firefox/firefox')
browser.maximize_window()

# Authentication
browser.get('https://gmail.com')

if config['video']:
  browser.save_screenshot(config['video_out_path'] + 'frame1.png')

browser.find_element_by_xpath('//*[@id="identifierId"]').send_keys(config['email'])

if config['video']:
  browser.save_screenshot(config['video_out_path'] + 'frame2.png')

browser.find_element_by_xpath('//*[@id="identifierNext"]/div/button/div[2]').click()
password_field = WebDriverWait(browser, config['wait_timeout']).until(ec.visibility_of_element_located((By.XPATH, '//input[@type="password"]')))
password_field.send_keys(config['password'])

if config['video']:
  browser.save_screenshot(config['video_out_path'] + 'frame3.png')

browser.find_element_by_xpath('//*[@id="passwordNext"]/div/button/div[2]').click()

wait = WebDriverWait(browser, config['wait_timeout'])

# Deleting sites
if len(datas['delete']) > 0:
  for data in datas['delete']:
    data['author'] = data['author'].encode("utf-8", "surrogateescape").decode("utf-8", "surrogatescape")
    browser.get('https://console.firebase.google.com/project/' + data['project_id'] + '/hosting/main')
    
    try:
      project_div_hover = wait.until(ec.visibility_of_element_located((By.XPATH, "//*[contains(text(),'" + data['site'] + "')]")))
      ActionChains(browser).move_to_element(project_div_hover).perform()
      ActionChains(browser).move_to_element(browser.find_element_by_xpath("//*[contains(text(), '" + data['site'] + "')]")).perform()
      cards = browser.find_elements_by_xpath('//site-overview-card')
      
      for index in range(0, len(cards)):
        if data['site'] in cards[index].get_attribute('innerHTML'):
          button_xpath = '//*[@id="main"]/fire-router-outlet/ng-component/ngh-hosting-sites/div/div/div/div[2]/md-single-grid/sites-overview-card/div/site-overview-card[' + str(index + 1) + ']/mat-card/mat-card-title/button'
          browser.find_element_by_xpath(button_xpath).click()
          browser.find_element_by_xpath('//*[@id="mat-menu-panel-' + str(index + 2) + '"]/div/button').click()
          browser.find_element_by_xpath('//*[@id="hosting_delete_site_dialog"]/ng-component/fire-dialog/div[2]/form/div/input').send_keys(data['site'])    
          delete_button = WebDriverWait(browser, config['wait_timeout']).until(ec.element_to_be_clickable((By.XPATH, '//*[@id="hosting_delete_site_dialog"]/ng-component/fire-dialog/div[3]/button[2]')))
          delete_button.click()

          querry = db.collection(config['firestore_collection']).where('values', 'array_contains', data).get()
          if len(querry) > 0:
            doc = db.collection(config['firestore_collection']).document(data['projectName']).get().to_dict()
            arr = doc['values']
            arr.remove(data)
            db.collection(config['firestore_collection']).document(data['projectName']).set(doc)
          sleep(2)
    except MoveTargetOutOfBoundsException as err:
      last_height = browser.execute_script("return document.body.scrollHeight")
      browser.execute_script("window.scrollTo(0, document.body.scrollHeight);")
      
      sleep(5)

      ActionChains(browser).move_to_element(browser.find_element_by_xpath("//*[contains(text(), '" + data['site'] + "')]")).perform()
      ActionChains(browser).move_to_element(browser.find_element_by_xpath("//*[contains(text(), '" + data['site'] + "')]")).perform()

      cards = browser.find_elements_by_xpath('//site-overview-card')
      
      for index in range(0, len(cards)):
        if data['site'] in cards[index].get_attribute('innerHTML'):
          button_xpath = '//*[@id="main"]/fire-router-outlet/ng-component/ngh-hosting-sites/div/div/div/div[2]/md-single-grid/sites-overview-card/div/site-overview-card[' + str(index + 1) + ']/mat-card/mat-card-title/button'
          browser.find_element_by_xpath(button_xpath).click()
          browser.find_element_by_xpath('//*[@id="mat-menu-panel-' + str(index + 2) + '"]/div/button').click()
          browser.find_element_by_xpath('//*[@id="hosting_delete_site_dialog"]/ng-component/fire-dialog/div[2]/form/div/input').send_keys(data['site'])    
          delete_button = WebDriverWait(browser, config['wait_timeout']).until(ec.element_to_be_clickable((By.XPATH, '//*[@id="hosting_delete_site_dialog"]/ng-component/fire-dialog/div[3]/button[2]')))
          delete_button.click()

          querry = db.collection(config['firestore_collection']).where('values', 'array_contains', data).get()
          if len(querry) > 0:
            doc = db.collection(config['firestore_collection']).document(data['projectName']).get().to_dict()
            arr = doc['values']
            arr.remove(data)
            db.collection(config['firestore_collection']).document(data['projectName']).set(doc)
          sleep(2)

# Creating sites
if len(datas['create']) > 0:
  for data in datas['create']:
    data['author'] = data['author'].encode("utf-8", "surrogateescape").decode("utf-8", "surrogatescape")
    
    # Check if site already exists
    querry = db.collection(config['firestore_collection']).where('values', 'array_contains', data).get()
    if len(querry) > 0:
      print('Site exists')
      continue
    
    browser.get('https://console.firebase.google.com/project/' + data['project_id'] + '/hosting/main?pli=1')

    if config['video']:
        browser.save_screenshot(config['video_out_path'] + 'frame4.png')
    try:
      add_site_button = WebDriverWait(browser, config['wait_timeout']).until(ec.visibility_of_element_located((By.XPATH, "//*[contains(text(),'Add another site')]")))
      add_site_button.click()
    except:
      last_height = browser.execute_script("return document.body.scrollHeight")
      browser.execute_script("window.scrollTo(0, document.body.scrollHeight);")
      sleep(4)
      if config['video']:
        browser.save_screenshot(config['video_out_path'] + 'frame5.png')

      add_site_button = WebDriverWait(browser, config['wait_timeout']).until(ec.visibility_of_element_located((By.XPATH, "//*[contains(text(),'Add another site')]")))
      add_site_button.click()

    site_field = WebDriverWait(browser, config['wait_timeout']).until(ec.visibility_of_element_located((By.XPATH, '//*[@id="hosting_add_site_dialog"]/ng-component/fire-dialog/div[2]/form/div/hosting-site-name-input/input')))
    site_field.send_keys(data['site'])

    add_button = WebDriverWait(browser, config['wait_timeout']).until(ec.visibility_of_element_located((By.XPATH, '//*[@id="hosting_add_site_dialog"]/ng-component/fire-dialog/div[3]/button[2]')))
    add_button.click()

    querry = db.collection(config['firestore_collection']).where('values', 'array_contains', data).get()
    if len(querry) < 1:
      doc = db.collection(config['firestore_collection']).document(data['projectName']).get().to_dict()
      if (doc == None):
        # First run
        u_data = { 'values': [] }
        u_data['values'].append(data)
        db.collection(config['firestore_collection']).document(data['projectName']).set(u_data)
      else:
        doc['values'].append(data)
        db.collection(config['firestore_collection']).document(data['projectName']).set(doc)

    sleep(2)

sleep(2)
browser.close()
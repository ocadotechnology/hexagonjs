import os
import os.path
import webapp2
import logging
from webapp2 import WSGIApplication, Route
from google.appengine.api import users

# hack until we can make this public

cache = dict()

class Content(webapp2.RequestHandler):
  def get(self, *args, **kwargs):
    urlPath = args[0]
    root = os.path.split(__file__)[0]
    errorPath = os.path.join(root, '404', 'index.html')
    try:
      paths = [
        os.path.join(root, urlPath + '.html'),
        os.path.join(root, urlPath + 'index.html'),
        os.path.join(root, urlPath + '/index.html'),
        os.path.join(root, urlPath)
      ]

      validPaths = [path for path in paths if os.path.isfile(path)]
      if len(validPaths) > 0:
        path = validPaths[0]
      else:
        path = errorPath
        self.response.set_status(404)

      if path.endswith(".css"):
        self.response.headers['Content-Type'] = 'text/css'
      elif path.endswith(".js"):
        self.response.headers['Content-Type'] = 'application/javascript'
      elif path.endswith(".html"):
        self.response.headers['Content-Type'] = 'text/html'
      elif path.endswith(".svg"):
        self.response.headers['Content-Type'] = 'image/svg+xml'

      self.response.headers['Cache-Control'] = 'public'
      self.response.headers['max-age'] = '300' # 5 minutes

      key = 'pages-' + path
      if key in cache:
        self.response.out.write(cache[key])
      else:
        f = open(path, 'r')
        content = f.read()
        cache[key] = content
        self.response.out.write(content)
    except:
      logging.exception("unable to serve page")
      path = errorPath
      f = open(path, 'r')
      content = f.read()
      self.response.out.write(content)
      self.response.set_status(404)

app = WSGIApplication([
  Route(r'/<:.*>', handler=Content)
], debug=True)

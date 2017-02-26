from urllib.request import urlopen
import json

def main():
	#to find go to page's FB page, at the end of URL find username
	#e.g. http://facebook.com/walmart, walmart is the username
	graph_url = "https://graph.facebook.com/"

	APP_ID = "165008204006667"
	APP_SECRET = "0f725ad8b39da0a2f612b1620c2f11c7"
	user = "walmart"

	post_url = create_post_url(graph_url, APP_ID, APP_SECRET, user)

	web_response = urlopen(post_url)
	readable_page = web_response.read()
	json_postdata = json.loads(readable_page)
	json_fbposts = json_postdata['data']

	json_string = json.dumps(json_fbposts, ensure_ascii=False).encode('utf8')

	#encoded = string.encode("utf-8", errors='ignore')
	print(json_string)
	

def create_post_url(graph_url, APP_ID, APP_SECRET, user):
	#method to return 
	post_args = user + "/posts/?key=value&access_token=" + APP_ID + "|" + APP_SECRET
	post_url = graph_url + post_args

	return post_url

if __name__ == "__main__":
    main()

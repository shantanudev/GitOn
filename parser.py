import json
from pprint import pprint

json_data=open("data.json")

data=json.load(json_data)
#pprint(data)

gitdata={}


for i in range(0,len(data)):
	date_val=data[i]["data"].split("T")[0]
	if date_val in gitdata:
		gitdata[date_val].extend(data[i]["comments"].items())
	else:
		gitdata[date_val]=data[i]["comments"].items()

#print gitdata["2014-10-01"]

#print "AFTER"

username_dict = dict()

for value_list in gitdata.values():
	username_to_values_dict = dict()
	for tuple in value_list:
		if tuple[0] not in username_to_values_dict:
			username_to_values_dict[tuple[0]] = tuple[1]
			username_dict[tuple[0]] = 0
		else:
			username_to_values_dict[tuple[0]] += tuple[1]
#print username_dict.items()
	value_list.append(username_to_values_dict.items())

for k, value_list in gitdata.iteritems():
	gitdata[k] = value_list[-1]


print username_dict



# print gitdata
#print gitdata["2014-10-05"]

f = open('realdata.csv','w')
f.write("dates")

for username in username_dict:
	f.write(",")
	f.write(username)

f.write("\n")

for key, value_list in gitdata.iteritems():
	f.write(key)

	for username in username_dict:
		seen = False
		for tuple in value_list:
			
			if(username == tuple[0]):
				f.write(",")
				f.write(str(tuple[1]))
				seen = True
				break

		if seen == False:
			f.write(",")
			f.write("0")

	f.write("\n")


#print gitdata

json_data.close()
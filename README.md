#To launch the back-end:

1) Install MySQL. Version 5.7.26 was used for development.

2) Run the scripts found in 'backend/src/main/resources/static/sql/' in your local MySQL instance.

3) Make sure your MySQL instance is up and running.  

4) Import the 'backend/' directory in your favorite Java IDE as an existing Maven project. Eclipse was used for this project.

5) Make sure all Maven dependecies have been correctly downloaded into you local repository (Maven > Update Project in Eclipse). Then launch src/main/java/com/reply/notesapp/NotesAppApplication.java as a standalone Java application.

6) For email registration to work, configure the following properties in src/main/resources/application.properties properties file:
*spring.mail.username (your configured google/gmail smtp account)
*spring.mail.password (password for the above mentioned account)
*app.host.name (name of your machine hosting this spring boot app on your local subnet.)


#To launch the front-end:

1) Install NodeJs. Version 10.16.0 was used for development.

2) Run 'npm install' from the 'frontend/' directory.

3) Launch the app with 'ng serve --proxy-config proxy.config.json' from the 'frontend/' directory.


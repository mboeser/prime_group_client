# Breakthrough Digital Attendance App
Breakthrough Twin Cities Web Attendance Application
 
A note about notes and uploads:
ADMIN NOTES: For a teacher, these exist on an expanded individual student view. This should be used for passing information about student records (phone, address, etc) to admin. When admin run a prework report, they will be able to see all admin notes and make adjustments in Salesforce as needed. THIS APP DOES NOT PERMANENTLY SAVE STUDENT DATA. Student data will always be overwritten with every upload of Salesforce data. The only exception is Middle School Bus information--that can be edited directly in the application. In order for the bus information to be saved for a student during a new upload, the student must be included in that upload. 
ATTENDANCE NOTES: This is the field regarding attendance. Teachers, while conducting prework in the class view, can edit attendance notes directly in the spreadsheet. This should be used for relaying attendance information such as confirmation or declination of attendance. Administration will only see this if the student is absent (and thus on the absent report), or if they expand the individual student view in prework.


#BASIC USER GUIDE
##TEACHER
	This will allow you to take attendance and conduct prework from your phone, computer, or mobile device!
 
1)   Go to breakthroughtwincities.herokuapp.com on a Chrome Browser (other browser may not allow all the features of this application).
2)   Using your @breakthroughtwincities.org email account, use the Google log in to verify your identity.
a.     If you are redirected back to the log in page with a message asking you to contact your admin team, you either used a non @breakthroughtwincities.org email address, or admin needs to give you access to the application before proceeding.
3)   Your Dashboard is your home page. There are 3 things you can do—select an upcoming class date, take today’s attendance, or log out.
a.     Take Today’s attendance will only appear if you have class today.
4)   After selecting a class date, you will be shown a list of your students for that class, their basic info, and clickable fields for editing. If you need more information on the student, just click on their student id. This will pull up their whole file.
a.     Please note, every month new data is loaded for students. If a student changes phone numbers, addresses, etc, you need to write that in the administration notes so it can be updated elsewhere. Bus information, however, can be updated in the application!
b.     If students have conflicts or will not be coming to class, please write reasons in attendance notes. Admin will follow up with absent students and determine whether or not the absence is excused.
5)   Taking attendance is as easy as clicking on the students who are here and hitting submit! Back to teaching! If a student comes in late, simply open attendance again and mark the student present. Everyone else should still be marked correctly!
6)   Hit logout when you are done!


##ADMINISTRATION
	This application will help you stay organized and efficient. 
Go to breakthroughtwincities.herokuapp.com on a Chrome Browser (application features may not run on a different browser).
 Using your @breakthroughtwincities.org email account, use the Google log in to verify your identity.
 If you are redirected back to the log in page with a message asking you to contact your admin team, you either used a non @breakthroughtwincities.org email address, or admin needs to give you access to the application before proceeding.
HOME takes you back to the dashboard screen
ADD USER takes you to the user management page
New Teachers and Admin need to be added to the system before they can use it. Enter First and Last name, their breakthroughtwincities.org email, and their role, either admin or teacher. Hitting ‘Add User’ will save their information and they can access the application right away. You must enter a unique e-mail address for each user. If you enter a duplicate e-mail address, the new entry will not be saved to the application. 
Below the form is a grid of all current users. You can change roles, names, and email address if needed. You can also delete users. 
IMPORT/EXPORT CSV allows you to populate the application using a specifically formatted excel spreadsheet.
VERY IMPORTANT!! When you upload a new CSV  (comma separated value file), all previous information in the application is overwritten, except middle school bus information. The CSV must have all information for the month of classes for all sites and must contain all student’s ids. If this CSV is incomplete and any students are missing, their bus information will be lost. If admin is not done with prework reports or absent reports, that information will be lost. Because of this, please upload only once per month and/or when all work is complete.
A recommendation is to download before uploading a new CSV
Please follow the spreadsheet exactly.
ATTENDANCE allows you to take attendance if you are subbing for a teacher (or both a teacher and an admin!) Click on Attendance, then select the teacher who has class today. You will then see the same screen the teacher would for their class attendance, and it works exactly the same. You will only be able to take attendance for the current day’s class. 
PREWORK REPORT generates a list of students for a selected class date and the work their teacher has done to contact them, along with notes for you.
ABSENT REPORT generates a list of students for a selected class date that were absent on that date. 
LOG OUT when you are done!

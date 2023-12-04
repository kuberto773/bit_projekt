# Reverse tabnabbing demonstration
This project demonstrates various techniques to perform reverse tabnabbing attack.

There are 2 containers in this project, one called **legit_app** which represents website to show various attacks and second one called **attacker_app** which contains malicious websites/endpoints created by attacker.
Legit app uses mongodb as its database for user registration and login/authentication.
## Usage
1. Run **docker-compose up --build -d** to build and run the containers
2. Run **docker logs -f projekt_app_docker-attacker_app-1** to view logs from attacker app in order to catch user's login information
3. Go to localhost:3000, which represents legit app
4. App represents 4 parts (in order to use the one you need to be registered as well as logged in)
5. Each part represents different methods to perform reverse tabnabbing
    - **first** part represents forum to which attacker inserts malicious payload(with prevention option)
    - **second** part represents attack with window.open() function(with prevention option)
    - **third** part represents method using iframe element
    - **fourth** part demonstrates how to prevent iframe attack
6. Besides mentioned methods of prevention the **Cross-Origin-Opener-Policy** header can be applied by setting environment variable **COOP=true**
    - however this does not prevent the iframe attack

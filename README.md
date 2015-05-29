# dubstep
Adding good 2-step auth support to `pass`

I've taken to using [pass](http://www.passwordstore.org) as my main password vault. It uses GPG for encryption and Git for cloud sync. It's a pain to set up, especially cross-device and on Android, but it can be done and it's easy thereafter.

I also use 2-factor authentication wherever possible, but I like hacking my phone, so obviously having all my logins tied to it is a problem.

To that end, I have written `dubstep`.

## Installation

    git clone https://github.com/andrew-t/dubstep.git
    npm install ./dubstep

## Storing credentials

Go to the website for which you want to set up two-factor authentication and have it display the credentials as text rather than a QR code. Then run `dubstep`:

    dubstep

You will be prompted for:
* a short name for the account — let's say you pick `example`.
* a long name for display in your Authenticator app
* your username
* your 2-factor authentication secret

Once done, view the QR code using

    pass show 2step/example
    
(All `dubstep` credentials are stored in `2step/`.)

Scan the QR code in your terminal window using your Authenticator app. The website will usually ask that you enter a code to prove it worked correctly. If it did, you should run `pass git push` to store your new credentials to the cloud.

## Security

Obviously this removes a level of security from two-factor if you think the following scenarios are plausible:
* Your GPG key has no password and your computer is unencrypted and someone steals it.
* Your GPG key and cloud storage are simultaneously compromised.
* People nearby often scan giant QR codes they see on your screen.

## Bonus

I added the code I create the in-terminal QR codes with to the command line, so you can QR any text or URL by typing

    qr http://www.andrewt.net

and this pipes nicely into other apps (usually).

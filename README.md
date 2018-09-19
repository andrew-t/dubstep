# dubstep
Adding good 2-step auth support to `pass`

I’ve taken to using [pass](http://www.passwordstore.org) as my main password vault. It uses GPG for encryption and Git for cloud sync. It’s a pain to set up, especially cross-device and on Android (tip: install [this app](https://github.com/zeapo/Android-Password-Store) and [this GPG keychain](http://www.openkeychain.org) using [F-Droid](https://f-droid.org)) but it can be done and it’s easy thereafter.

I also use 2-factor authentication wherever possible, but I like hacking my phone, so obviously having all my logins tied to it is a problem.

To that end, I have written `dubstep`.

## Installation

    git clone https://github.com/andrew-t/dubstep.git
    cd dubstep
    npm install -g .

If you use `gopass` add `export PASSCLIENT=gopass` to your bash profile or whatever.

## Storing credentials

Go to the website for which you want to set up two-factor authentication and have it display the credentials as text rather than a QR code. Then run `dubstep`:

    dubstep

You will be prompted for:
* a short name for the account — let’s say you pick `example`.
* a long name for display in your Authenticator app
* your username
* your 2-factor authentication secret

Once done, view the QR code using

    dubstep qr example
    
Scan the QR code in your terminal window using your Authenticator app. The website will usually ask that you enter a code to prove it worked correctly. If it did, you should run `pass git push` to store your new credentials to the cloud.

## Generating codes

Now that your computer knows all your 2FA secrets, there’s no real reason you should need to get your phone out if you want a code. So instead, you can use

    dubstep code example

and you can add a `-c` flag to the end to copy the code to the clipboard.

## Security

Obviously this removes a level of security from two-factor if you think the following scenarios are plausible:
* Your GPG key has no password and your computer is unencrypted and someone steals it.
* Your GPG key and cloud storage are simultaneously compromised.
* People nearby often scan giant QR codes they see on your screen.

2FA is supposed to be ‘something you know’ (your password) and ‘something you have’ (your phone). This makes it more like ‘two things you know’ when you’re using your own computer. But that’s already true when you’re using your phone, so maybe just exercise proper caution with your computer and everything will be fine?

## Bonus

I added the code I create the in-terminal QR codes with to the command line, so you can QR any text or URL by typing

    qr http://www.andrewt.net

and this pipes nicely into other apps (usually).

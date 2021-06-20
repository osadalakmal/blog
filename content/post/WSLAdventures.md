# Adventures in WSL Land

Recently I have joined a new company and as almost always is the case ( at least in Sri Lanka ) I received a laptop
that runs Windows. In this case it was running a rather old version of Windows 10 that did not support WSL2. This documents
my adventures in getting this laptop setup so that I can have a relatively modest working and development environment familiar
to most *nix developers.

## Getting to a good starting place

The first point of order was getting windows updated so that we could at least try on a new way of developing on this laptop.
To this end I started by forcing a windows update. And curiously this failed. Turns out the reason was a McAfee program that was installed 
on the laptop for some security work. Turns out it was incompatible with the windows update. After that was resolved I was off to the races.
But a good thing to keep in mind is always check if you are running the latest version of the OS and unless there is a very good reason not to
do so, always upgrade it to the latest version.

## Virtualization platforms

Next up was selecting a virtualization platform to be used. In the past I had almost always reached for virtual box. VMWare was prohibitively costly
and nowhere near as intuitive. But sadly Virtualbox seems to be neglected more and more under the stewardship of Oracle and there are no signs of things
improving anytime soon. I am guessing Larry doesnt really see a point in free things unless it is Oracle getting those free things. So I was pretty happy to find


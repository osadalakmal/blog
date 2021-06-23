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
improving anytime soon. I am guessing Larry doesn't really see a point in free things unless it is Oracle getting those free things. So I was pretty happy to find
that windows now includes a native virtualization platform called Hyper-V.

## Hyper-V - Still Rough Around the edges

The management of the VMs is done via a GUI called Hyper-V Manager (This is microsoft remember?). It looks something like below
![Hyper-V Manager](/img/Microsoft-Hyper-V-manager.jpg)
There is a list of VMs in the middle and the operations that can be carried on the VMs tucked away on the right in a separate pane. It looks like a reverse version
of virtual box GUI. The looks are deceptive though and not all the crucial functionality is available through the GUI. The majority of the GUI seems to be 
just a nice overlay over command line tooling that is best accessed through the Powershell command line. A good case in point is the networking part of the virtualization infrastructure. The networking part of the configuration is hidden behind the "Virtual Switch Manager". But that is actually best accessed through the command line as described [here](https://docs.microsoft.com/en-us/virtualization/hyper-v-on-windows/user-guide/setup-nat-network). And there are strange limitations and errors that can pop up. One is that there can only be one NAT internal type switch and if you somehow manage to create two, the system seems to go in to this undefined state where no virtualization features will work including docker with HyperV backend. You would have to install a patch, prey a couple of times to the god of small bugs of virtualization (Thanks Terry!) and restart the machine a couple of times. And hopefully it will resolve itself.

Next time we will go in to details about the networking and how to make sense of the options as someone coming from virtualbox/Linux land.


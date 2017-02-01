# BosDeco
Static website

# Getting Started

To get you started you can simply clone the bosdeco repository and install the dependencies:

### Prerequisites

You need git to clone the angular-seed repository. You can get git from
[http://git-scm.com/](http://git-scm.com/).

We also use a number of node.js tools to initialize and test angular-seed. You must have node.js and
its package manager (npm) installed.  You can get them from [http://nodejs.org/](http://nodejs.org/).

### Clone bosdeco

Clone the angular-seed repository using [git][git]:

```
git clone https://github.com/bozgaaa/bosdeco.git
cd angular-seed
```

### Install Dependencies

* We get the bootstrap dependencies via `bower`, a [client-side code package manager][bower].

I've preconfigured `npm` to automatically run `bower` so we can simply do:

```
npm install
```

Behind the scenes this will also call `bower install`.  You should find that you have two new
folders in your project.

* `app/bower_components` - contains the vendors libraries

*Note that the `bower_components` folder would normally be installed in the root folder but
this default location was changed through the `.bowerrc` file.
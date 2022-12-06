<div align="center">
  <a href="https://github.com/kemaldotearth/skeletor">
    <img src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/skull_1f480.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">skeletor-cli</h3>
  <p align="center">
    A simple CLI tool for generating front end design system packages.
    <br />
    <br />
    <a href="https://github.com/kemaldotearth/skeletor/issues">Report Bug</a>
    ·
    <a href="https://github.com/kemaldotearth/skeletor/issues">Request Feature</a>
  </p>
</div>

## What is this?
Skeletor is a small CLI tool that helps designers and engineers scaffold their component libraries in seconds.

As well as a quick way to setup a component library with all the tooling you love, there are (or will be) added utils to help with other arduous design systems tasks.

The project currently only supports the building of React libraries written in TypeScript.

The project is also **currently a WIP.**

## Getting Started
You can simply run the following in your preferred Terminal:

```
npm install -g @kemal.earth/skeletor-cli
```

Basic usage:

```
skeletor generate:ui
```

After that Skeletor will prompt you to navigate to your new library and run a simple `npm install`.

Optionally you can include a library like Tailwind by passing a simple flag:

```
skeletor generate:ui --with-tailwind
```

Congrats! You just spun up a React component library in seconds. 🎉

## Roadmap
Below is a high level roadmap of what's been done so far and potential things to come in the future.

- [x] Generate component library (React & TypeScript).
- [x] Add Tailwind support.
- [ ] Add Styled Components support.
- [ ] Add Radix UI support.
- [ ] What next?


## Contributing
The project is open for contributions, but it is currently in an exploratory state. Open for ideas on what else this tiny tool can take care of.

Contribution Guide (Coming soon!)


## Contact
This project is maintained by me, [Kemal](https://kemal.earth). If you have any questions, feel free to open an issue in this repo! :) 

For now ✌️

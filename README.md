# React Router Project

## Background

This is my attempt to build a better React Router.  Here are my requirements:

1. Creating route animations should be easy and simple.  POJO's at a minimum and classes for more advanced uses.  Eventually, an animation builder may be implemented.
1. Animations should be flexible enough to accomplish most use cases.
1. Routing with animations should be easy and controlled by the calling component.
1. The router should be efficient in terms of rendering 2 page components max and only during animation transitions.
1. The router and its components should be testable.

## Design Philosophy

The Router component is very simple and implements a very rudimentary stack.  The navigator component is responsible for buffering components in memory and performing the animations.  Animations are plug-and-play and easy to extend.

## Why reinvent the wheel?

The current routing options for React Native are pretty terrible.  Very few routers have good support for animations between pages.  The best routing framework out there now is React Navigation, and it has severe limitations for everyday uses.

## How do I run this?

1. Clone this app.
1. Run `yarn && yarn start`.
1. Install the Expo app on your phone.
1. Scan the QR code in your terminal.

# README

The purpose of this application is to store and display the on-duty schedule for a team.

## Local Development

To get started, run `make` to install dependencies and build the application.

`make`
- Installs dependencies
- Builds application and starts watcher

`make server`
- Runs development server. All assets are served from the _/public_ directory. You can also use SimpleHTTPServer; example: `python -m SimpleHTTPServer 8000`

`make build`
- Builds application for production deployment

## Environments

- CloudFront: https://dsu822xx8tib3.cloudfront.net/
- S3: http://supporthero.s3-website-us-west-1.amazonaws.com/

## Features

- Display today’s Support Hero.
- Display a single user’s schedule showing the days they are assigned to Support Hero
- Display the full schedule for all users in the current month.
- Users should be able to mark one of their days on duty as undoable
- The system should reschedule accordingly
- Should take into account weekends and California’s holidays.
- Users should be able to swap duty with another user’s specific day

## Resources

- A Ruby-based framework.
- UI of your choice: CLI, Web UI, ...
- Heavy emphasis pretending this is a system you would deploy
- OO and architecture best practices.

## Starting Order

```
['Sherry', 'Boris', 'Vicente', 'Matte', 'Jack', 'Sherry', 'Matte', 'Kevin', 'Kevin', 'Vicente', 'Zoe', 'Kevin', 'Matte', 'Zoe', 'Jay', 'Boris', 'Eadon', 'Sherry', 'Franky', 'Sherry', 'Matte', 'Franky', 'Franky', 'Kevin', 'Boris', 'Franky', 'Vicente', 'Luis', 'Eadon', 'Boris', 'Kevin', 'Matte', 'Jay', 'James', 'Kevin', 'Sherry', 'Sherry', 'Jack', 'Sherry', 'Jack']
```

# whisker-private-api
### NOTICE: I no longer have access to a Whisker/Ting device, so I can't continue development of this project.

An API to expose a Ting sensor's information for use Home Assistant

TODO:

- [ ] Add support for multiple sensors
- [ ] Add support for voltage readings (SignalR)

## Installation

### Docker

1. Create a docker-compose.yml file with the contents in the `docker-compose.example.yml` file (in this repository).
2. Fill in your enviroment variables (see [Getting Environment Variables](#getting-environment-variables))
3. Run `docker-compose up -d`

### Manual

1. Clone this repository
2. Create a .env file with the contents in the `.env.example` file (in this repository)
3. Fill in your enviroment variables (see [Getting Environment Variables](#getting-environment-variables))
4. Run `yarn install`
5. Run `yarn start`

## Getting Environment Variables

To get your API key and user ID, you'll need to setup a proxy to intercept the requests from the Ting app. I recommend using [Proxyman](https://proxyman.io/), which has a free version available. Once you have a proxy installed, on your device you'll need to enter the proxy URL (in Proxyman this is at the center-top of the screen) in your proxy settings. Once you've done that, you _may_ need to install a CA Certificate for your mobile device. For Proxyman, this can be found [here](https://docs.proxyman.io/debug-devices/ios-device). Once all of that is done, proceed to open the Ting app and in Proxyman, search for a request to `api.wskr.io`. Find the `/api/v1/Users/:userid` route (with the GET method) and click on it. In the request details, you'll find your API key under the `x-wl-api-key` header and your user ID in the URL (the numbers after `Users/`).

## Usage

To use this in Home Assistant, and the following to your `configuration.yaml` file:

```yaml
sensor:
  - platform: rest
    name: Whisker Site
    resource: http://<WHISKER-PRIVATE-API-HOST-IP>:8080
    value_template: "{{ value_json.site_id }}"
    scan_interval: 60
    method: GET
    json_attributes:
      - "site_id"
      - "hazard_powerQualityHazard"
      - "hazard_isFire"
  - platform: template
    sensors:
      whisker_power_quality_hazard:
        friendly_name: Power Quality Hazard
        value_template: '{{ states.sensor.whisker_site.attributes["hazard_powerQualityHazard"] }}'
      whisker_power_fire:
        friendly_name: Power Fire
        value_template: '{{ states.sensor.whisker_site.attributes["hazard_isFire"] }}'
```

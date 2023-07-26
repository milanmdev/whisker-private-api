import express from "express";
import fetch from "node-fetch";
import { HttpError, GlobalVars } from "../utils/utils";
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const fetchAPI: any = await fetch(
      `${GlobalVars.api}/Users/${process.env.USER_ID}`,
      {
        method: "GET",
        headers: {
          "x-wl-api-key": process.env.API_KEY ? process.env.API_KEY : "",
        },
      }
    ).then((res) => res.json());

    let json = {
      user_id: fetchAPI.user_id,
      site_id: fetchAPI.sites[0].id,
      site_name: fetchAPI.sites[0].displayName,
      site_address:
        fetchAPI.sites[0].addressLine1 +
        " " +
        (fetchAPI.sites[0].addressLine2
          ? fetchAPI.sites[0].addressLine2 + " "
          : "") +
        fetchAPI.sites[0].city +
        " " +
        fetchAPI.sites[0].stateProvince +
        " " +
        fetchAPI.sites[0].postalCode,
      site_timezone: fetchAPI.sites[0].timeZone,
      device_serial: fetchAPI.devices[0].serialNumber,
      device_type: fetchAPI.devices[0].type,
      device_learningMode: fetchAPI.devices[0].learningMode,
      device_hvacVerified: fetchAPI.devices[0].isHvacVerified ? "Yes" : "No",
      group_id: fetchAPI.devices[0].group.id,
      group_name: fetchAPI.devices[0].group.name,
      group_logo: fetchAPI.devices[0].group.logoUrl,
      hazard_powerQualityHazard: fetchAPI.sites[0].isPowerQualityHazard ? "Yes" : "No",
      hazard_isFire: fetchAPI.devices[0].isFire ? "Yes" : "No",
      hazard_efhStatus: fetchAPI.devices[0].fireHazardStatus.efhStatus.status,
      hazard_ufhStatus: fetchAPI.devices[0].fireHazardStatus.ufhStatus.status,
    };

    return res.json(json);
  } catch (e: any) {
    return res.status(500).json({
      error: true,
      message: e.message,
    });
  }
});

export default router;

require("dotenv").config();
const Immutable = require("immutable");

const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
const path = require("path");

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", express.static(path.join(__dirname, "../public")));
// MOCKS: Rover info:
const mocCuriosityInfo = {
  rover: {
    id: 5,
    name: "Curiosity",
    landing_date: "2012-08-06",
    launch_date: "2011-11-26",
    status: "active",
    max_sol: 2871,
    max_date: "2020-09-02",
    total_photos: 440163,
    cameras: [
      {
        name: "FHAZ",
        full_name: "Front Hazard Avoidance Camera",
      },
      {
        name: "NAVCAM",
        full_name: "Navigation Camera",
      },
      {
        name: "MAST",
        full_name: "Mast Camera",
      },
      {
        name: "CHEMCAM",
        full_name: "Chemistry and Camera Complex",
      },
      {
        name: "MAHLI",
        full_name: "Mars Hand Lens Imager",
      },
      {
        name: "MARDI",
        full_name: "Mars Descent Imager",
      },
      {
        name: "RHAZ",
        full_name: "Rear Hazard Avoidance Camera",
      },
    ],
  },
};
const mocOpportunityInfo = {
  rover: {
    id: 6,
    name: "Opportunity",
    landing_date: "2004-01-25",
    launch_date: "2003-07-07",
    status: "complete",
    max_sol: 5111,
    max_date: "2018-06-11",
    total_photos: 198439,
    cameras: [
      { name: "FHAZ", full_name: "Front Hazard Avoidance Camera" },
      { name: "NAVCAM", full_name: "Navigation Camera" },
      { name: "PANCAM", full_name: "Panoramic Camera" },
      {
        name: "MINITES",
        full_name: "Miniature Thermal Emission Spectrometer (Mini-TES)",
      },
      { name: "ENTRY", full_name: "Entry, Descent, and Landing Camera" },
      { name: "RHAZ", full_name: "Rear Hazard Avoidance Camera" },
    ],
  },
};
const mocSpiritInfo = {
  rover: {
    id: 7,
    name: "Spirit",
    landing_date: "2004-01-04",
    launch_date: "2003-06-10",
    status: "complete",
    max_sol: 2208,
    max_date: "2010-03-21",
    total_photos: 124550,
    cameras: [
      { name: "FHAZ", full_name: "Front Hazard Avoidance Camera" },
      { name: "NAVCAM", full_name: "Navigation Camera" },
      { name: "PANCAM", full_name: "Panoramic Camera" },
      {
        name: "MINITES",
        full_name: "Miniature Thermal Emission Spectrometer (Mini-TES)",
      },
      { name: "ENTRY", full_name: "Entry, Descent, and Landing Camera" },
      { name: "RHAZ", full_name: "Rear Hazard Avoidance Camera" },
    ],
  },
};
const mocCuriosityPhotos = {
  photos: [
    {
      id: 3132,
      sol: 10,
      camera: {
        id: 23,
        name: "CHEMCAM",
        rover_id: 5,
        full_name: "Chemistry and Camera Complex",
      },
      img_src:
        "http://mars.jpl.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/00010/soas/rdr/ccam/CR0_398380645PRCLF0030000CCAM04010L1.PNG",
      earth_date: "2012-08-16",
      rover: {
        id: 5,
        name: "Curiosity",
        landing_date: "2012-08-06",
        launch_date: "2011-11-26",
        status: "active",
      },
    },
    {
      id: 58870,
      sol: 10,
      camera: {
        id: 23,
        name: "CHEMCAM",
        rover_id: 5,
        full_name: "Chemistry and Camera Complex",
      },
      img_src:
        "http://mars.jpl.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/00010/opgs/edr/ccam/CR0_398381687EDR_F0030000CCAM05010M_.JPG",
      earth_date: "2012-08-16",
      rover: {
        id: 5,
        name: "Curiosity",
        landing_date: "2012-08-06",
        launch_date: "2011-11-26",
        status: "active",
      },
    },
    {
      id: 58871,
      sol: 10,
      camera: {
        id: 23,
        name: "CHEMCAM",
        rover_id: 5,
        full_name: "Chemistry and Camera Complex",
      },
      img_src:
        "http://mars.jpl.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/00010/opgs/edr/ccam/CR0_398381577EDR_F0030000CCAM05010M_.JPG",
      earth_date: "2012-08-16",
      rover: {
        id: 5,
        name: "Curiosity",
        landing_date: "2012-08-06",
        launch_date: "2011-11-26",
        status: "active",
      },
    },
    {
      id: 58872,
      sol: 10,
      camera: {
        id: 23,
        name: "CHEMCAM",
        rover_id: 5,
        full_name: "Chemistry and Camera Complex",
      },
      img_src:
        "http://mars.jpl.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/00010/opgs/edr/ccam/CR0_398381468EDR_F0030000CCAM05010M_.JPG",
      earth_date: "2012-08-16",
      rover: {
        id: 5,
        name: "Curiosity",
        landing_date: "2012-08-06",
        launch_date: "2011-11-26",
        status: "active",
      },
    },
    {
      id: 58873,
      sol: 10,
      camera: {
        id: 23,
        name: "CHEMCAM",
        rover_id: 5,
        full_name: "Chemistry and Camera Complex",
      },
      img_src:
        "http://mars.jpl.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/00010/opgs/edr/ccam/CR0_398381359EDR_F0030000CCAM05010M_.JPG",
      earth_date: "2012-08-16",
      rover: {
        id: 5,
        name: "Curiosity",
        landing_date: "2012-08-06",
        launch_date: "2011-11-26",
        status: "active",
      },
    },
    {
      id: 58874,
      sol: 10,
      camera: {
        id: 23,
        name: "CHEMCAM",
        rover_id: 5,
        full_name: "Chemistry and Camera Complex",
      },
      img_src:
        "http://mars.jpl.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/00010/opgs/edr/ccam/CR0_398381250EDR_F0030000CCAM05010M_.JPG",
      earth_date: "2012-08-16",
      rover: {
        id: 5,
        name: "Curiosity",
        landing_date: "2012-08-06",
        launch_date: "2011-11-26",
        status: "active",
      },
    },
    {
      id: 58875,
      sol: 10,
      camera: {
        id: 23,
        name: "CHEMCAM",
        rover_id: 5,
        full_name: "Chemistry and Camera Complex",
      },
      img_src:
        "http://mars.jpl.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/00010/opgs/edr/ccam/CR0_398381109EDR_F0030000CCAM05010M_.JPG",
      earth_date: "2012-08-16",
      rover: {
        id: 5,
        name: "Curiosity",
        landing_date: "2012-08-06",
        launch_date: "2011-11-26",
        status: "active",
      },
    },
    {
      id: 58876,
      sol: 10,
      camera: {
        id: 23,
        name: "CHEMCAM",
        rover_id: 5,
        full_name: "Chemistry and Camera Complex",
      },
      img_src:
        "http://mars.jpl.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/00010/opgs/edr/ccam/CR0_398380999EDR_F0030000CCAM05010M_.JPG",
      earth_date: "2012-08-16",
      rover: {
        id: 5,
        name: "Curiosity",
        landing_date: "2012-08-06",
        launch_date: "2011-11-26",
        status: "active",
      },
    },
    {
      id: 58877,
      sol: 10,
      camera: {
        id: 23,
        name: "CHEMCAM",
        rover_id: 5,
        full_name: "Chemistry and Camera Complex",
      },
      img_src:
        "http://mars.jpl.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/00010/opgs/edr/ccam/CR0_398380890EDR_F0030000CCAM05010M_.JPG",
      earth_date: "2012-08-16",
      rover: {
        id: 5,
        name: "Curiosity",
        landing_date: "2012-08-06",
        launch_date: "2011-11-26",
        status: "active",
      },
    },
    {
      id: 58878,
      sol: 10,
      camera: {
        id: 23,
        name: "CHEMCAM",
        rover_id: 5,
        full_name: "Chemistry and Camera Complex",
      },
      img_src:
        "http://mars.jpl.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/00010/opgs/edr/ccam/CR0_398380781EDR_F0030000CCAM05010M_.JPG",
      earth_date: "2012-08-16",
      rover: {
        id: 5,
        name: "Curiosity",
        landing_date: "2012-08-06",
        launch_date: "2011-11-26",
        status: "active",
      },
    },
    {
      id: 58879,
      sol: 10,
      camera: {
        id: 23,
        name: "CHEMCAM",
        rover_id: 5,
        full_name: "Chemistry and Camera Complex",
      },
      img_src:
        "http://mars.jpl.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/00010/opgs/edr/ccam/CR0_398380645EDR_F0030000CCAM04010M_.JPG",
      earth_date: "2012-08-16",
      rover: {
        id: 5,
        name: "Curiosity",
        landing_date: "2012-08-06",
        launch_date: "2011-11-26",
        status: "active",
      },
    },
    {
      id: 58880,
      sol: 10,
      camera: {
        id: 23,
        name: "CHEMCAM",
        rover_id: 5,
        full_name: "Chemistry and Camera Complex",
      },
      img_src:
        "http://mars.jpl.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/00010/soas/rdr/ccam/CR0_398381687PRCLF0030000CCAM05010L1.PNG",
      earth_date: "2012-08-16",
      rover: {
        id: 5,
        name: "Curiosity",
        landing_date: "2012-08-06",
        launch_date: "2011-11-26",
        status: "active",
      },
    },
    {
      id: 58881,
      sol: 10,
      camera: {
        id: 23,
        name: "CHEMCAM",
        rover_id: 5,
        full_name: "Chemistry and Camera Complex",
      },
      img_src:
        "http://mars.jpl.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/00010/soas/rdr/ccam/CR0_398381577PRCLF0030000CCAM05010L1.PNG",
      earth_date: "2012-08-16",
      rover: {
        id: 5,
        name: "Curiosity",
        landing_date: "2012-08-06",
        launch_date: "2011-11-26",
        status: "active",
      },
    },
    {
      id: 58882,
      sol: 10,
      camera: {
        id: 23,
        name: "CHEMCAM",
        rover_id: 5,
        full_name: "Chemistry and Camera Complex",
      },
      img_src:
        "http://mars.jpl.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/00010/soas/rdr/ccam/CR0_398381468PRCLF0030000CCAM05010L1.PNG",
      earth_date: "2012-08-16",
      rover: {
        id: 5,
        name: "Curiosity",
        landing_date: "2012-08-06",
        launch_date: "2011-11-26",
        status: "active",
      },
    },
    {
      id: 58883,
      sol: 10,
      camera: {
        id: 23,
        name: "CHEMCAM",
        rover_id: 5,
        full_name: "Chemistry and Camera Complex",
      },
      img_src:
        "http://mars.jpl.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/00010/soas/rdr/ccam/CR0_398381359PRCLF0030000CCAM05010L1.PNG",
      earth_date: "2012-08-16",
      rover: {
        id: 5,
        name: "Curiosity",
        landing_date: "2012-08-06",
        launch_date: "2011-11-26",
        status: "active",
      },
    },
    {
      id: 58884,
      sol: 10,
      camera: {
        id: 23,
        name: "CHEMCAM",
        rover_id: 5,
        full_name: "Chemistry and Camera Complex",
      },
      img_src:
        "http://mars.jpl.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/00010/soas/rdr/ccam/CR0_398381250PRCLF0030000CCAM05010L1.PNG",
      earth_date: "2012-08-16",
      rover: {
        id: 5,
        name: "Curiosity",
        landing_date: "2012-08-06",
        launch_date: "2011-11-26",
        status: "active",
      },
    },
    {
      id: 58885,
      sol: 10,
      camera: {
        id: 23,
        name: "CHEMCAM",
        rover_id: 5,
        full_name: "Chemistry and Camera Complex",
      },
      img_src:
        "http://mars.jpl.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/00010/soas/rdr/ccam/CR0_398381109PRCLF0030000CCAM05010L1.PNG",
      earth_date: "2012-08-16",
      rover: {
        id: 5,
        name: "Curiosity",
        landing_date: "2012-08-06",
        launch_date: "2011-11-26",
        status: "active",
      },
    },
    {
      id: 58886,
      sol: 10,
      camera: {
        id: 23,
        name: "CHEMCAM",
        rover_id: 5,
        full_name: "Chemistry and Camera Complex",
      },
      img_src:
        "http://mars.jpl.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/00010/soas/rdr/ccam/CR0_398380999PRCLF0030000CCAM05010L1.PNG",
      earth_date: "2012-08-16",
      rover: {
        id: 5,
        name: "Curiosity",
        landing_date: "2012-08-06",
        launch_date: "2011-11-26",
        status: "active",
      },
    },
    {
      id: 58887,
      sol: 10,
      camera: {
        id: 23,
        name: "CHEMCAM",
        rover_id: 5,
        full_name: "Chemistry and Camera Complex",
      },
      img_src:
        "http://mars.jpl.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/00010/soas/rdr/ccam/CR0_398380890PRCLF0030000CCAM05010L1.PNG",
      earth_date: "2012-08-16",
      rover: {
        id: 5,
        name: "Curiosity",
        landing_date: "2012-08-06",
        launch_date: "2011-11-26",
        status: "active",
      },
    },
    {
      id: 58888,
      sol: 10,
      camera: {
        id: 23,
        name: "CHEMCAM",
        rover_id: 5,
        full_name: "Chemistry and Camera Complex",
      },
      img_src:
        "http://mars.jpl.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/00010/soas/rdr/ccam/CR0_398380781PRCLF0030000CCAM05010L1.PNG",
      earth_date: "2012-08-16",
      rover: {
        id: 5,
        name: "Curiosity",
        landing_date: "2012-08-06",
        launch_date: "2011-11-26",
        status: "active",
      },
    },
    {
      id: 3777,
      sol: 10,
      camera: {
        id: 24,
        name: "MAHLI",
        rover_id: 5,
        full_name: "Mars Hand Lens Imager",
      },
      img_src:
        "http://mars.jpl.nasa.gov/msl-raw-images/msss/00010/mhli/0010MH0000000030100003I01_DXXX.jpg",
      earth_date: "2012-08-16",
      rover: {
        id: 5,
        name: "Curiosity",
        landing_date: "2012-08-06",
        launch_date: "2011-11-26",
        status: "active",
      },
    },
    {
      id: 86519,
      sol: 10,
      camera: {
        id: 24,
        name: "MAHLI",
        rover_id: 5,
        full_name: "Mars Hand Lens Imager",
      },
      img_src:
        "http://mars.jpl.nasa.gov/msl-raw-images/msss/00010/mhli/0010MH0000000030100003E01_DXXX.jpg",
      earth_date: "2012-08-16",
      rover: {
        id: 5,
        name: "Curiosity",
        landing_date: "2012-08-06",
        launch_date: "2011-11-26",
        status: "active",
      },
    },
    {
      id: 2095,
      sol: 10,
      camera: {
        id: 26,
        name: "NAVCAM",
        rover_id: 5,
        full_name: "Navigation Camera",
      },
      img_src:
        "http://mars.jpl.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/00010/opgs/edr/ncam/NLA_398380694EDR_F0030000NCAM15000M_.JPG",
      earth_date: "2012-08-16",
      rover: {
        id: 5,
        name: "Curiosity",
        landing_date: "2012-08-06",
        launch_date: "2011-11-26",
        status: "active",
      },
    },
    {
      id: 2672,
      sol: 10,
      camera: {
        id: 26,
        name: "NAVCAM",
        rover_id: 5,
        full_name: "Navigation Camera",
      },
      img_src:
        "http://mars.jpl.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/00010/opgs/edr/ncam/NRA_398380694EDR_F0030000NCAM15000M_.JPG",
      earth_date: "2012-08-16",
      rover: {
        id: 5,
        name: "Curiosity",
        landing_date: "2012-08-06",
        launch_date: "2011-11-26",
        status: "active",
      },
    },
    {
      id: 32406,
      sol: 10,
      camera: {
        id: 26,
        name: "NAVCAM",
        rover_id: 5,
        full_name: "Navigation Camera",
      },
      img_src:
        "http://mars.jpl.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/00010/opgs/edr/ncam/NLA_398381736EDR_F0030000NCAM15000M_.JPG",
      earth_date: "2012-08-16",
      rover: {
        id: 5,
        name: "Curiosity",
        landing_date: "2012-08-06",
        launch_date: "2011-11-26",
        status: "active",
      },
    },
    {
      id: 49166,
      sol: 10,
      camera: {
        id: 26,
        name: "NAVCAM",
        rover_id: 5,
        full_name: "Navigation Camera",
      },
      img_src:
        "http://mars.jpl.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/00010/opgs/edr/ncam/NRA_398381736EDR_F0030000NCAM15000M_.JPG",
      earth_date: "2012-08-16",
      rover: {
        id: 5,
        name: "Curiosity",
        landing_date: "2012-08-06",
        launch_date: "2011-11-26",
        status: "active",
      },
    },
  ],
};
const mocOpportunityPhotos = {
  photos: [
    {
      id: 119056,
      sol: 10,
      camera: {
        id: 14,
        name: "FHAZ",
        rover_id: 6,
        full_name: "Front Hazard Avoidance Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/f/010/1F129070908EDN0224P1101L0M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 119057,
      sol: 10,
      camera: {
        id: 14,
        name: "FHAZ",
        rover_id: 6,
        full_name: "Front Hazard Avoidance Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/f/010/1F129070908EDN0224P1101R0M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 119058,
      sol: 10,
      camera: {
        id: 14,
        name: "FHAZ",
        rover_id: 6,
        full_name: "Front Hazard Avoidance Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/f/010/1F129071539EDN0224P1101L0M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 119059,
      sol: 10,
      camera: {
        id: 14,
        name: "FHAZ",
        rover_id: 6,
        full_name: "Front Hazard Avoidance Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/f/010/1F129071539EDN0224P1101R0M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 119060,
      sol: 10,
      camera: {
        id: 14,
        name: "FHAZ",
        rover_id: 6,
        full_name: "Front Hazard Avoidance Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/f/010/1F129071875EDN0224P1101L0M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 119061,
      sol: 10,
      camera: {
        id: 14,
        name: "FHAZ",
        rover_id: 6,
        full_name: "Front Hazard Avoidance Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/f/010/1F129071875EDN0224P1101R0M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266764,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129072226EFF0224P2134L2M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266765,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129072261EFF0224P2134L5M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266766,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129072293EFF0224P2134L6M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266767,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129072325EFF0224P2134L7M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266768,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129072509EFF0224P2133R1M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266769,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129072563EFF0224P2133R2M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266770,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129073124EFF0224P2370L2M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266771,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129073124EFF0224P2370R2M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266772,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129073180EFF0224P2370L7M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266773,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129073180EFF0224P2370R1M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266774,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129073544EFF0224P2370L2M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266775,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129073544EFF0224P2370R2M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266776,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129073637EFF0224P2370L7M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266777,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129073637EFF0224P2370R1M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266778,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129074109EFF0224P2370L2M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266779,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129074109EFF0224P2370R2M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266780,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129074187EFF0224P2370L7M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266781,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129074187EFF0224P2370R1M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266782,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129074625EFF0224P2370L2M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266783,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129074625EFF0224P2370R2M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266784,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129074696EFF0224P2370L7M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266785,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129074696EFF0224P2370R1M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266786,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129075117EFF0224P2370L2M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266787,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129075117EFF0224P2370R2M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266788,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129075187EFF0224P2370L7M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266789,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129075187EFF0224P2370R1M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266790,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129075610EFF0224P2370L2M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266791,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129075610EFF0224P2370R2M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266792,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129075680EFF0224P2370L7M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266793,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129075680EFF0224P2370R1M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266794,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129076102EFF0224P2370L2M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266795,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129076102EFF0224P2370R2M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266796,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129076172EFF0224P2370L7M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266797,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129076172EFF0224P2370R1M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266798,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129076596EFF0224P2370L2M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266799,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129076596EFF0224P2370R2M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266800,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129076761EFF0224P2370L7M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266801,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129076761EFF0224P2370R1M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266802,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129079394EFF0224P2537L2M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266803,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129079394EFF0224P2537R2M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266804,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129079448EFF0224P2537L7M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266805,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129079448EFF0224P2537R1M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266806,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129079487EFF0224P2537L3M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266807,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129079487EFF0224P2537R3M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266808,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129079534EFF0224P2537L4M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266809,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129079534EFF0224P2537R4M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266810,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129079577EFF0224P2537L5M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266811,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129079577EFF0224P2537R5M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266812,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129079619EFF0224P2537L6M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266813,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129079619EFF0224P2537R6M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266814,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129079663EFF0224P2537R7M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266815,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129081110EFF0224P2850L8M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266816,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129081110EFF0224P2850R8M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266817,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129081154EFF0224P2850L8M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266818,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129081154EFF0224P2850R8M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266819,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129069151EDN0224P2538L2M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266820,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129069151EDN0224P2538R2M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266821,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129073223EDN0224P2370L3M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266822,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129073223EDN0224P2370R3M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266823,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129073255EDN0224P2370L4M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266824,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129073255EDN0224P2370R4M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266825,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129073288EDN0224P2370L5M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266826,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129073288EDN0224P2370R5M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266827,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129073323EDN0224P2370L6M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266828,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129073323EDN0224P2370R6M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266829,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129073430EDN0224P2370R7M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266830,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129073709EDN0224P2370L3M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266831,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129073709EDN0224P2370R3M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266832,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129073786EDN0224P2370L4M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266833,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129073786EDN0224P2370R4M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266834,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129073855EDN0224P2370L5M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266835,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129073855EDN0224P2370R5M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266836,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129073898EDN0224P2370L6M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266837,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129073898EDN0224P2370R6M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266838,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129073998EDN0224P2370R7M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266839,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129074250EDN0224P2370L3M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266840,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129074250EDN0224P2370R3M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266841,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129074327EDN0224P2370L4M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266842,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129074327EDN0224P2370R4M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266843,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129074389EDN0224P2370L5M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266844,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129074389EDN0224P2370R5M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266845,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129074429EDN0224P2370L6M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266846,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129074429EDN0224P2370R6M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266847,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129074525EDN0224P2370R7M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266848,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129074755EDN0224P2370L3M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266849,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129074755EDN0224P2370R3M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266850,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129074821EDN0224P2370L4M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266851,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129074821EDN0224P2370R4M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266852,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129074883EDN0224P2370L5M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266853,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129074883EDN0224P2370R5M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266854,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129074923EDN0224P2370L6M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266855,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129074923EDN0224P2370R6M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266856,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129075015EDN0224P2370R7M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266857,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129075247EDN0224P2370L3M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266858,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129075247EDN0224P2370R3M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266859,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129075314EDN0224P2370L4M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266860,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129075314EDN0224P2370R4M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266861,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129075376EDN0224P2370L5M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266862,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129075376EDN0224P2370R5M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266863,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129075416EDN0224P2370L6M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266864,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129075416EDN0224P2370R6M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266865,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129075509EDN0224P2370R7M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266866,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129075740EDN0224P2370L3M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266867,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129075740EDN0224P2370R3M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266868,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129075806EDN0224P2370L4M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266869,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129075806EDN0224P2370R4M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266870,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129075867EDN0224P2370L5M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266871,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129075867EDN0224P2370R5M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266872,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129075908EDN0224P2370L6M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266873,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129075908EDN0224P2370R6M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266874,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129076000EDN0224P2370R7M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266875,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129076232EDN0224P2370L3M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266876,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129076232EDN0224P2370R3M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266877,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129076298EDN0224P2370L4M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266878,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129076298EDN0224P2370R4M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266879,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129076363EDN0224P2370L5M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266880,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129076363EDN0224P2370R5M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266881,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129076404EDN0224P2370L6M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266882,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129076404EDN0224P2370R6M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266883,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129076495EDN0224P2370R7M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266884,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129076800EDN0224P2370L3M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266885,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129076800EDN0224P2370R3M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266886,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129076841EDN0224P2370L4M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266887,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129076841EDN0224P2370R4M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266888,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129076891EDN0224P2370L5M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266889,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129076891EDN0224P2370R5M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266890,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129076932EDN0224P2370L6M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266891,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129076932EDN0224P2370R6M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266892,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129077025EDN0224P2370R7M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266893,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129077535EDN0224P2539L2M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266894,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129077535EDN0224P2539R2M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266895,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129084126EDN0224P2539L2M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266896,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129084126EDN0224P2539R2M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266897,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129084267EDN0224P2538L2M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266898,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129084267EDN0224P2538R2M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266899,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129069032ESF0224P2812L2M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266900,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129069067ESF0224P2812L7M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266901,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129069104ESF0224P2812R1M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266902,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129069161ESF0224P2538L2M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266903,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129069197ESF0224P2538L7M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266904,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129069239ESF0224P2538R1M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266905,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129071999ESF0224P2600L8M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266906,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129071999ESF0224P2600R8M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266907,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129072067ESF0224P2810L2M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266908,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129072098ESF0224P2810L5M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266909,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129072128ESF0224P2810L6M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266910,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129072158ESF0224P2810L7M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266911,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129072376ESF0224P2809R1M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266912,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129072400ESF0224P2809R7M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266913,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129072638ESF0224P2811L2M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266914,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129072672ESF0224P2811L3M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266915,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129072702ESF0224P2811L4M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266916,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129072733ESF0224P2811L5M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266917,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129072764ESF0224P2811L6M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266918,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129072795ESF0224P2811L7M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266919,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129072827ESF0224P2811R2M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266920,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129072860ESF0224P2811R1M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266921,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129072892ESF0224P2811R3M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266922,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129072923ESF0224P2811R4M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266923,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129072949ESF0224P2811R5M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266924,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129073032ESF0224P2811R6M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266925,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129073064ESF0224P2811R7M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266926,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129077551ESF0224P2539L2M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266927,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129077587ESF0224P2539L7M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266928,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129077634ESF0224P2539R1M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266929,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129077716ESF0224P2812L2M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266930,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129077750ESF0224P2812L7M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266931,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129077781ESF0224P2812R1M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266932,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129079709ESF0224P2811L2M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266933,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129079800ESF0224P2811L3M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266934,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129079830ESF0224P2811L4M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266935,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129079906ESF0224P2811L5M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266936,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129079937ESF0224P2811L6M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266937,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129080017ESF0224P2811L7M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266938,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129080046ESF0224P2811R2M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266939,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129080118ESF0224P2811R1M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266940,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129080154ESF0224P2811R3M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266941,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129080228ESF0224P2811R4M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266942,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129080249ESF0224P2811R5M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266943,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129080288ESF0224P2811R6M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266944,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129080317ESF0224P2811R7M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266945,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129081185ESF0224P2600L8M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266946,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129081185ESF0224P2600R8M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266947,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129084142ESF0224P2539L2M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266948,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129084178ESF0224P2539L7M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266949,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129084227ESF0224P2539R1M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266950,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129084277ESF0224P2538L2M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266951,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129084313ESF0224P2538L7M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266952,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129084359ESF0224P2538R1M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266953,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129084427ESF0224P2812L2M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266954,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129084462ESF0224P2812L7M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266955,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129084493ESF0224P2812R1M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266956,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129084556ESF0224P2600L8M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 266957,
      sol: 10,
      camera: {
        id: 17,
        name: "PANCAM",
        rover_id: 6,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/p/010/1P129084556ESF0224P2600R8M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 279421,
      sol: 10,
      camera: {
        id: 18,
        name: "MINITES",
        rover_id: 6,
        full_name: "Miniature Thermal Emission Spectrometer (Mini-TES)",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/m/010/1M129070954EFF0224P2933M2M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 279422,
      sol: 10,
      camera: {
        id: 18,
        name: "MINITES",
        rover_id: 6,
        full_name: "Miniature Thermal Emission Spectrometer (Mini-TES)",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/m/010/1M129071013EFF0224P2933M2M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 279423,
      sol: 10,
      camera: {
        id: 18,
        name: "MINITES",
        rover_id: 6,
        full_name: "Miniature Thermal Emission Spectrometer (Mini-TES)",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/m/010/1M129071072EFF0224P2933M2M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 279424,
      sol: 10,
      camera: {
        id: 18,
        name: "MINITES",
        rover_id: 6,
        full_name: "Miniature Thermal Emission Spectrometer (Mini-TES)",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/m/010/1M129071134EFF0224P2933M2M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 279425,
      sol: 10,
      camera: {
        id: 18,
        name: "MINITES",
        rover_id: 6,
        full_name: "Miniature Thermal Emission Spectrometer (Mini-TES)",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/m/010/1M129071193EFF0224P2933M2M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
    {
      id: 279426,
      sol: 10,
      camera: {
        id: 18,
        name: "MINITES",
        rover_id: 6,
        full_name: "Miniature Thermal Emission Spectrometer (Mini-TES)",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/1/m/010/1M129071300EFF0224P2923M1M1-BR.JPG",
      earth_date: "2004-02-04",
      rover: {
        id: 6,
        name: "Opportunity",
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        status: "complete",
      },
    },
  ],
};
const mocSpiritPhotos = {
  photos: [
    {
      id: 287279,
      sol: 10,
      camera: {
        id: 27,
        name: "FHAZ",
        rover_id: 7,
        full_name: "Front Hazard Avoidance Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/f/010/2F127246527EFF0211P1003L0M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 287280,
      sol: 10,
      camera: {
        id: 27,
        name: "FHAZ",
        rover_id: 7,
        full_name: "Front Hazard Avoidance Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/f/010/2F127246527EFF0211P1003R0M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 287281,
      sol: 10,
      camera: {
        id: 27,
        name: "FHAZ",
        rover_id: 7,
        full_name: "Front Hazard Avoidance Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/f/010/2F127254455EFF0214P1003L0M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 287282,
      sol: 10,
      camera: {
        id: 27,
        name: "FHAZ",
        rover_id: 7,
        full_name: "Front Hazard Avoidance Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/f/010/2F127254455EFF0214P1003R0M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 287283,
      sol: 10,
      camera: {
        id: 27,
        name: "FHAZ",
        rover_id: 7,
        full_name: "Front Hazard Avoidance Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/f/010/2F127262650EFF0214P1003L0M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 287284,
      sol: 10,
      camera: {
        id: 27,
        name: "FHAZ",
        rover_id: 7,
        full_name: "Front Hazard Avoidance Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/f/010/2F127262650EFF0214P1003R0M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 287285,
      sol: 10,
      camera: {
        id: 27,
        name: "FHAZ",
        rover_id: 7,
        full_name: "Front Hazard Avoidance Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/f/010/2F127262797EFF0216P1003L0M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 287286,
      sol: 10,
      camera: {
        id: 27,
        name: "FHAZ",
        rover_id: 7,
        full_name: "Front Hazard Avoidance Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/f/010/2F127262797EFF0216P1003R0M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 287287,
      sol: 10,
      camera: {
        id: 27,
        name: "FHAZ",
        rover_id: 7,
        full_name: "Front Hazard Avoidance Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/f/010/2F127262938EFF0218P1003L0M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 287288,
      sol: 10,
      camera: {
        id: 27,
        name: "FHAZ",
        rover_id: 7,
        full_name: "Front Hazard Avoidance Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/f/010/2F127262938EFF0218P1003R0M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 287289,
      sol: 10,
      camera: {
        id: 27,
        name: "FHAZ",
        rover_id: 7,
        full_name: "Front Hazard Avoidance Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/f/010/2F127263078EFF0220P1003L0M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 287290,
      sol: 10,
      camera: {
        id: 27,
        name: "FHAZ",
        rover_id: 7,
        full_name: "Front Hazard Avoidance Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/f/010/2F127263078EFF0220P1003R0M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 287291,
      sol: 10,
      camera: {
        id: 27,
        name: "FHAZ",
        rover_id: 7,
        full_name: "Front Hazard Avoidance Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/f/010/2F127263223EFF0222P1003L0M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 287292,
      sol: 10,
      camera: {
        id: 27,
        name: "FHAZ",
        rover_id: 7,
        full_name: "Front Hazard Avoidance Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/f/010/2F127263223EFF0222P1003R0M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 287293,
      sol: 10,
      camera: {
        id: 27,
        name: "FHAZ",
        rover_id: 7,
        full_name: "Front Hazard Avoidance Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/f/010/2F127263615EFF0224P1003L0M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 287294,
      sol: 10,
      camera: {
        id: 27,
        name: "FHAZ",
        rover_id: 7,
        full_name: "Front Hazard Avoidance Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/f/010/2F127263615EFF0224P1003R0M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 290643,
      sol: 10,
      camera: {
        id: 28,
        name: "RHAZ",
        rover_id: 7,
        full_name: "Rear Hazard Avoidance Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/r/010/2R127246492EFF0211P1004L0M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 290644,
      sol: 10,
      camera: {
        id: 28,
        name: "RHAZ",
        rover_id: 7,
        full_name: "Rear Hazard Avoidance Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/r/010/2R127246492EFF0211P1004R0M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 290645,
      sol: 10,
      camera: {
        id: 28,
        name: "RHAZ",
        rover_id: 7,
        full_name: "Rear Hazard Avoidance Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/r/010/2R127254504EFF0214P1004L0M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 290646,
      sol: 10,
      camera: {
        id: 28,
        name: "RHAZ",
        rover_id: 7,
        full_name: "Rear Hazard Avoidance Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/r/010/2R127254504EFF0214P1004R0M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 290647,
      sol: 10,
      camera: {
        id: 28,
        name: "RHAZ",
        rover_id: 7,
        full_name: "Rear Hazard Avoidance Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/r/010/2R127262701EFF0214P1004L0M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 290648,
      sol: 10,
      camera: {
        id: 28,
        name: "RHAZ",
        rover_id: 7,
        full_name: "Rear Hazard Avoidance Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/r/010/2R127262701EFF0214P1004R0M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 290649,
      sol: 10,
      camera: {
        id: 28,
        name: "RHAZ",
        rover_id: 7,
        full_name: "Rear Hazard Avoidance Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/r/010/2R127262846EFF0216P1004L0M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 290650,
      sol: 10,
      camera: {
        id: 28,
        name: "RHAZ",
        rover_id: 7,
        full_name: "Rear Hazard Avoidance Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/r/010/2R127262846EFF0216P1004R0M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 290651,
      sol: 10,
      camera: {
        id: 28,
        name: "RHAZ",
        rover_id: 7,
        full_name: "Rear Hazard Avoidance Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/r/010/2R127262987EFF0218P1004L0M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 290652,
      sol: 10,
      camera: {
        id: 28,
        name: "RHAZ",
        rover_id: 7,
        full_name: "Rear Hazard Avoidance Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/r/010/2R127262987EFF0218P1004R0M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 290653,
      sol: 10,
      camera: {
        id: 28,
        name: "RHAZ",
        rover_id: 7,
        full_name: "Rear Hazard Avoidance Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/r/010/2R127263129EFF0220P1004L0M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 290654,
      sol: 10,
      camera: {
        id: 28,
        name: "RHAZ",
        rover_id: 7,
        full_name: "Rear Hazard Avoidance Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/r/010/2R127263129EFF0220P1004R0M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 290655,
      sol: 10,
      camera: {
        id: 28,
        name: "RHAZ",
        rover_id: 7,
        full_name: "Rear Hazard Avoidance Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/r/010/2R127263312EFF0222P1004L0M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 290656,
      sol: 10,
      camera: {
        id: 28,
        name: "RHAZ",
        rover_id: 7,
        full_name: "Rear Hazard Avoidance Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/r/010/2R127263312EFF0222P1004R0M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 290657,
      sol: 10,
      camera: {
        id: 28,
        name: "RHAZ",
        rover_id: 7,
        full_name: "Rear Hazard Avoidance Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/r/010/2R127263665EFF0224P1004L0M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 290658,
      sol: 10,
      camera: {
        id: 28,
        name: "RHAZ",
        rover_id: 7,
        full_name: "Rear Hazard Avoidance Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/r/010/2R127263665EFF0224P1004R0M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 318086,
      sol: 10,
      camera: {
        id: 29,
        name: "NAVCAM",
        rover_id: 7,
        full_name: "Navigation Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/n/010/2N127263955EFF0224P1528L0M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 318087,
      sol: 10,
      camera: {
        id: 29,
        name: "NAVCAM",
        rover_id: 7,
        full_name: "Navigation Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/n/010/2N127263955EFF0224P1528R0M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 318088,
      sol: 10,
      camera: {
        id: 29,
        name: "NAVCAM",
        rover_id: 7,
        full_name: "Navigation Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/n/010/2N127264004EFF0224P1528L0M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 318089,
      sol: 10,
      camera: {
        id: 29,
        name: "NAVCAM",
        rover_id: 7,
        full_name: "Navigation Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/n/010/2N127264004EFF0224P1528R0M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 318090,
      sol: 10,
      camera: {
        id: 29,
        name: "NAVCAM",
        rover_id: 7,
        full_name: "Navigation Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/n/010/2N127264431EFF0224P1512L0M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 318091,
      sol: 10,
      camera: {
        id: 29,
        name: "NAVCAM",
        rover_id: 7,
        full_name: "Navigation Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/n/010/2N127264431EFF0224P1512R0M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 318092,
      sol: 10,
      camera: {
        id: 29,
        name: "NAVCAM",
        rover_id: 7,
        full_name: "Navigation Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/n/010/2N127264529EFF0224P1512L0M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 318093,
      sol: 10,
      camera: {
        id: 29,
        name: "NAVCAM",
        rover_id: 7,
        full_name: "Navigation Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/n/010/2N127264529EFF0224P1512R0M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 318094,
      sol: 10,
      camera: {
        id: 29,
        name: "NAVCAM",
        rover_id: 7,
        full_name: "Navigation Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/n/010/2N127264590EFF0224P1512L0M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 318095,
      sol: 10,
      camera: {
        id: 29,
        name: "NAVCAM",
        rover_id: 7,
        full_name: "Navigation Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/n/010/2N127264590EFF0224P1512R0M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 318096,
      sol: 10,
      camera: {
        id: 29,
        name: "NAVCAM",
        rover_id: 7,
        full_name: "Navigation Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/n/010/2N127264628EFF0224P1512L0M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 318097,
      sol: 10,
      camera: {
        id: 29,
        name: "NAVCAM",
        rover_id: 7,
        full_name: "Navigation Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/n/010/2N127264628EFF0224P1512R0M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 318098,
      sol: 10,
      camera: {
        id: 29,
        name: "NAVCAM",
        rover_id: 7,
        full_name: "Navigation Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/n/010/2N127264766EFF0224P1512L0M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 318099,
      sol: 10,
      camera: {
        id: 29,
        name: "NAVCAM",
        rover_id: 7,
        full_name: "Navigation Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/n/010/2N127264766EFF0224P1512R0M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 318100,
      sol: 10,
      camera: {
        id: 29,
        name: "NAVCAM",
        rover_id: 7,
        full_name: "Navigation Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/n/010/2N127264868EFF0224P1512L0M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 318101,
      sol: 10,
      camera: {
        id: 29,
        name: "NAVCAM",
        rover_id: 7,
        full_name: "Navigation Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/n/010/2N127264868EFF0224P1512R0M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 318102,
      sol: 10,
      camera: {
        id: 29,
        name: "NAVCAM",
        rover_id: 7,
        full_name: "Navigation Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/n/010/2N127264978EFF0224P1512L0M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 318103,
      sol: 10,
      camera: {
        id: 29,
        name: "NAVCAM",
        rover_id: 7,
        full_name: "Navigation Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/n/010/2N127264978EFF0224P1512R0M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 318104,
      sol: 10,
      camera: {
        id: 29,
        name: "NAVCAM",
        rover_id: 7,
        full_name: "Navigation Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/n/010/2N127265088EFF0224P1512L0M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 318105,
      sol: 10,
      camera: {
        id: 29,
        name: "NAVCAM",
        rover_id: 7,
        full_name: "Navigation Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/n/010/2N127265088EFF0224P1512R0M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 318106,
      sol: 10,
      camera: {
        id: 29,
        name: "NAVCAM",
        rover_id: 7,
        full_name: "Navigation Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/n/010/2N127265210EFF0224P1512L0M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 318107,
      sol: 10,
      camera: {
        id: 29,
        name: "NAVCAM",
        rover_id: 7,
        full_name: "Navigation Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/n/010/2N127265210EFF0224P1512R0M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 318108,
      sol: 10,
      camera: {
        id: 29,
        name: "NAVCAM",
        rover_id: 7,
        full_name: "Navigation Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/n/010/2N127265346EFF0224P1512L0M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 318109,
      sol: 10,
      camera: {
        id: 29,
        name: "NAVCAM",
        rover_id: 7,
        full_name: "Navigation Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/n/010/2N127265346EFF0224P1512R0M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 318110,
      sol: 10,
      camera: {
        id: 29,
        name: "NAVCAM",
        rover_id: 7,
        full_name: "Navigation Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/n/010/2N127265424EFF0224P1513L0M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 318111,
      sol: 10,
      camera: {
        id: 29,
        name: "NAVCAM",
        rover_id: 7,
        full_name: "Navigation Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/n/010/2N127265424EFF0224P1513R0M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 318112,
      sol: 10,
      camera: {
        id: 29,
        name: "NAVCAM",
        rover_id: 7,
        full_name: "Navigation Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/n/010/2N127265516EFF0224P1513L0M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 318113,
      sol: 10,
      camera: {
        id: 29,
        name: "NAVCAM",
        rover_id: 7,
        full_name: "Navigation Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/n/010/2N127265516EFF0224P1513R0M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 318114,
      sol: 10,
      camera: {
        id: 29,
        name: "NAVCAM",
        rover_id: 7,
        full_name: "Navigation Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/n/010/2N127265732EFF0224P1513L0M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 318115,
      sol: 10,
      camera: {
        id: 29,
        name: "NAVCAM",
        rover_id: 7,
        full_name: "Navigation Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/n/010/2N127265732EFF0224P1513R0M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 318116,
      sol: 10,
      camera: {
        id: 29,
        name: "NAVCAM",
        rover_id: 7,
        full_name: "Navigation Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/n/010/2N127265953EFF0224P1513L0M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 318117,
      sol: 10,
      camera: {
        id: 29,
        name: "NAVCAM",
        rover_id: 7,
        full_name: "Navigation Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/n/010/2N127265953EFF0224P1513R0M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 318118,
      sol: 10,
      camera: {
        id: 29,
        name: "NAVCAM",
        rover_id: 7,
        full_name: "Navigation Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/n/010/2N127266163EFF0224P1513L0M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 318119,
      sol: 10,
      camera: {
        id: 29,
        name: "NAVCAM",
        rover_id: 7,
        full_name: "Navigation Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/n/010/2N127266163EFF0224P1513R0M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 318120,
      sol: 10,
      camera: {
        id: 29,
        name: "NAVCAM",
        rover_id: 7,
        full_name: "Navigation Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/n/010/2N127265611ESF0224P1513L0M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 318121,
      sol: 10,
      camera: {
        id: 29,
        name: "NAVCAM",
        rover_id: 7,
        full_name: "Navigation Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/n/010/2N127265611ESF0224P1513R0M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 318122,
      sol: 10,
      camera: {
        id: 29,
        name: "NAVCAM",
        rover_id: 7,
        full_name: "Navigation Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/n/010/2N127265839ESF0224P1513L0M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 318123,
      sol: 10,
      camera: {
        id: 29,
        name: "NAVCAM",
        rover_id: 7,
        full_name: "Navigation Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/n/010/2N127265839ESF0224P1513R0M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 318124,
      sol: 10,
      camera: {
        id: 29,
        name: "NAVCAM",
        rover_id: 7,
        full_name: "Navigation Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/n/010/2N127266054ESF0224P1513L0M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 318125,
      sol: 10,
      camera: {
        id: 29,
        name: "NAVCAM",
        rover_id: 7,
        full_name: "Navigation Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/n/010/2N127266054ESF0224P1513R0M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 318126,
      sol: 10,
      camera: {
        id: 29,
        name: "NAVCAM",
        rover_id: 7,
        full_name: "Navigation Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/n/010/2N127266230ESF0224P1513L0M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 318127,
      sol: 10,
      camera: {
        id: 29,
        name: "NAVCAM",
        rover_id: 7,
        full_name: "Navigation Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/n/010/2N127266230ESF0224P1513R0M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 318128,
      sol: 10,
      camera: {
        id: 29,
        name: "NAVCAM",
        rover_id: 7,
        full_name: "Navigation Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/n/010/2N127266333ESF0224P1513L0M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 318129,
      sol: 10,
      camera: {
        id: 29,
        name: "NAVCAM",
        rover_id: 7,
        full_name: "Navigation Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/n/010/2N127266333ESF0224P1513R0M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 318130,
      sol: 10,
      camera: {
        id: 29,
        name: "NAVCAM",
        rover_id: 7,
        full_name: "Navigation Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/n/010/2N127266408ESF0224P1513L0M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 318131,
      sol: 10,
      camera: {
        id: 29,
        name: "NAVCAM",
        rover_id: 7,
        full_name: "Navigation Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/n/010/2N127266408ESF0224P1513R0M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 318132,
      sol: 10,
      camera: {
        id: 29,
        name: "NAVCAM",
        rover_id: 7,
        full_name: "Navigation Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/n/010/2N127266502ESF0224P1513L0M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 318133,
      sol: 10,
      camera: {
        id: 29,
        name: "NAVCAM",
        rover_id: 7,
        full_name: "Navigation Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/n/010/2N127266502ESF0224P1513R0M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 318134,
      sol: 10,
      camera: {
        id: 29,
        name: "NAVCAM",
        rover_id: 7,
        full_name: "Navigation Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/n/010/2N127268121ESF0224P1513L0M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 318135,
      sol: 10,
      camera: {
        id: 29,
        name: "NAVCAM",
        rover_id: 7,
        full_name: "Navigation Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/n/010/2N127268121ESF0224P1513R0M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 395814,
      sol: 10,
      camera: {
        id: 30,
        name: "PANCAM",
        rover_id: 7,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/p/010/2P127246856EFF0211P2132L8M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 395815,
      sol: 10,
      camera: {
        id: 30,
        name: "PANCAM",
        rover_id: 7,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/p/010/2P127246856EFF0211P2132R8M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 395816,
      sol: 10,
      camera: {
        id: 30,
        name: "PANCAM",
        rover_id: 7,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/p/010/2P127246899EFF0211P2132L8M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 395817,
      sol: 10,
      camera: {
        id: 30,
        name: "PANCAM",
        rover_id: 7,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/p/010/2P127246899EFF0211P2132R8M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 395818,
      sol: 10,
      camera: {
        id: 30,
        name: "PANCAM",
        rover_id: 7,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/p/010/2P127246960EFF0211P2216L2M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 395819,
      sol: 10,
      camera: {
        id: 30,
        name: "PANCAM",
        rover_id: 7,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/p/010/2P127246960EFF0211P2216R2M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 395820,
      sol: 10,
      camera: {
        id: 30,
        name: "PANCAM",
        rover_id: 7,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/p/010/2P127247092EFF0211P2216L2M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 395821,
      sol: 10,
      camera: {
        id: 30,
        name: "PANCAM",
        rover_id: 7,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/p/010/2P127247092EFF0211P2216R2M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 395822,
      sol: 10,
      camera: {
        id: 30,
        name: "PANCAM",
        rover_id: 7,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/p/010/2P127247306EFF0211P2216L2M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 395823,
      sol: 10,
      camera: {
        id: 30,
        name: "PANCAM",
        rover_id: 7,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/p/010/2P127247306EFF0211P2216R2M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 395824,
      sol: 10,
      camera: {
        id: 30,
        name: "PANCAM",
        rover_id: 7,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/p/010/2P127247506EFF0211P2216L2M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 395825,
      sol: 10,
      camera: {
        id: 30,
        name: "PANCAM",
        rover_id: 7,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/p/010/2P127247506EFF0211P2216R2M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 395826,
      sol: 10,
      camera: {
        id: 30,
        name: "PANCAM",
        rover_id: 7,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/p/010/2P127247698EFF0211P2216L2M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 395827,
      sol: 10,
      camera: {
        id: 30,
        name: "PANCAM",
        rover_id: 7,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/p/010/2P127247698EFF0211P2216R2M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 395828,
      sol: 10,
      camera: {
        id: 30,
        name: "PANCAM",
        rover_id: 7,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/p/010/2P127247888EFF0211P2216L2M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 395829,
      sol: 10,
      camera: {
        id: 30,
        name: "PANCAM",
        rover_id: 7,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/p/010/2P127247888EFF0211P2216R2M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 395830,
      sol: 10,
      camera: {
        id: 30,
        name: "PANCAM",
        rover_id: 7,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/p/010/2P127248086EFF0211P2216L2M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 395831,
      sol: 10,
      camera: {
        id: 30,
        name: "PANCAM",
        rover_id: 7,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/p/010/2P127248086EFF0211P2216R2M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 395832,
      sol: 10,
      camera: {
        id: 30,
        name: "PANCAM",
        rover_id: 7,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/p/010/2P127248269EFF0211P2216L2M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 395833,
      sol: 10,
      camera: {
        id: 30,
        name: "PANCAM",
        rover_id: 7,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/p/010/2P127248269EFF0211P2216R2M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 395834,
      sol: 10,
      camera: {
        id: 30,
        name: "PANCAM",
        rover_id: 7,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/p/010/2P127248455EFF0211P2216L2M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 395835,
      sol: 10,
      camera: {
        id: 30,
        name: "PANCAM",
        rover_id: 7,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/p/010/2P127248455EFF0211P2216R2M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 395836,
      sol: 10,
      camera: {
        id: 30,
        name: "PANCAM",
        rover_id: 7,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/p/010/2P127254841EFF0214P2137L1M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 395837,
      sol: 10,
      camera: {
        id: 30,
        name: "PANCAM",
        rover_id: 7,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/p/010/2P127254976EFF0214P2137L7M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 395838,
      sol: 10,
      camera: {
        id: 30,
        name: "PANCAM",
        rover_id: 7,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/p/010/2P127255090EFF0214P2137R1M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 395839,
      sol: 10,
      camera: {
        id: 30,
        name: "PANCAM",
        rover_id: 7,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/p/010/2P127256198EFF0214P2132L8M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 395840,
      sol: 10,
      camera: {
        id: 30,
        name: "PANCAM",
        rover_id: 7,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/p/010/2P127256198EFF0214P2132R8M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 395841,
      sol: 10,
      camera: {
        id: 30,
        name: "PANCAM",
        rover_id: 7,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/p/010/2P127256256EFF0214P2132L8M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 395842,
      sol: 10,
      camera: {
        id: 30,
        name: "PANCAM",
        rover_id: 7,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/p/010/2P127256256EFF0214P2132R8M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 395843,
      sol: 10,
      camera: {
        id: 30,
        name: "PANCAM",
        rover_id: 7,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/p/010/2P127264243EFF0224P2132L8M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 395844,
      sol: 10,
      camera: {
        id: 30,
        name: "PANCAM",
        rover_id: 7,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/p/010/2P127264243EFF0224P2132R8M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 395845,
      sol: 10,
      camera: {
        id: 30,
        name: "PANCAM",
        rover_id: 7,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/p/010/2P127264314EFF0224P2132L8M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 395846,
      sol: 10,
      camera: {
        id: 30,
        name: "PANCAM",
        rover_id: 7,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/p/010/2P127264314EFF0224P2132R8M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 395847,
      sol: 10,
      camera: {
        id: 30,
        name: "PANCAM",
        rover_id: 7,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/p/010/2P127268212EFF0224P2701L2M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 395848,
      sol: 10,
      camera: {
        id: 30,
        name: "PANCAM",
        rover_id: 7,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/p/010/2P127268212EFF0224P2701R2M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 395849,
      sol: 10,
      camera: {
        id: 30,
        name: "PANCAM",
        rover_id: 7,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/p/010/2P127246687EDN0211P2104L2M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 395850,
      sol: 10,
      camera: {
        id: 30,
        name: "PANCAM",
        rover_id: 7,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/p/010/2P127246719EDN0211P2104L7M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 395851,
      sol: 10,
      camera: {
        id: 30,
        name: "PANCAM",
        rover_id: 7,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/p/010/2P127246772EDN0211P2102L2M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 395852,
      sol: 10,
      camera: {
        id: 30,
        name: "PANCAM",
        rover_id: 7,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/p/010/2P127246804EDN0211P2102L7M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 395853,
      sol: 10,
      camera: {
        id: 30,
        name: "PANCAM",
        rover_id: 7,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/p/010/2P127247001EDN0211P2216L5M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 395854,
      sol: 10,
      camera: {
        id: 30,
        name: "PANCAM",
        rover_id: 7,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/p/010/2P127247024EDN0211P2216L6M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 395855,
      sol: 10,
      camera: {
        id: 30,
        name: "PANCAM",
        rover_id: 7,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/p/010/2P127247048EDN0211P2216R7M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 395856,
      sol: 10,
      camera: {
        id: 30,
        name: "PANCAM",
        rover_id: 7,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/p/010/2P127247133EDN0211P2216L5M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 395857,
      sol: 10,
      camera: {
        id: 30,
        name: "PANCAM",
        rover_id: 7,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/p/010/2P127247181EDN0211P2216L6M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 395858,
      sol: 10,
      camera: {
        id: 30,
        name: "PANCAM",
        rover_id: 7,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/p/010/2P127247206EDN0211P2216R7M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 395859,
      sol: 10,
      camera: {
        id: 30,
        name: "PANCAM",
        rover_id: 7,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/p/010/2P127247385EDN0211P2216L5M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 395860,
      sol: 10,
      camera: {
        id: 30,
        name: "PANCAM",
        rover_id: 7,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/p/010/2P127247416EDN0211P2216L6M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 395861,
      sol: 10,
      camera: {
        id: 30,
        name: "PANCAM",
        rover_id: 7,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/p/010/2P127247439EDN0211P2216R7M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 395862,
      sol: 10,
      camera: {
        id: 30,
        name: "PANCAM",
        rover_id: 7,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/p/010/2P127247579EDN0211P2216L5M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 395863,
      sol: 10,
      camera: {
        id: 30,
        name: "PANCAM",
        rover_id: 7,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/p/010/2P127247611EDN0211P2216L6M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 395864,
      sol: 10,
      camera: {
        id: 30,
        name: "PANCAM",
        rover_id: 7,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/p/010/2P127247634EDN0211P2216R7M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 395865,
      sol: 10,
      camera: {
        id: 30,
        name: "PANCAM",
        rover_id: 7,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/p/010/2P127247776EDN0211P2216L5M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 395866,
      sol: 10,
      camera: {
        id: 30,
        name: "PANCAM",
        rover_id: 7,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/p/010/2P127247799EDN0211P2216L6M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 395867,
      sol: 10,
      camera: {
        id: 30,
        name: "PANCAM",
        rover_id: 7,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/p/010/2P127247823EDN0211P2216R7M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 395868,
      sol: 10,
      camera: {
        id: 30,
        name: "PANCAM",
        rover_id: 7,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/p/010/2P127247969EDN0211P2216L5M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 395869,
      sol: 10,
      camera: {
        id: 30,
        name: "PANCAM",
        rover_id: 7,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/p/010/2P127247992EDN0211P2216L6M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 395870,
      sol: 10,
      camera: {
        id: 30,
        name: "PANCAM",
        rover_id: 7,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/p/010/2P127248016EDN0211P2216R7M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 395871,
      sol: 10,
      camera: {
        id: 30,
        name: "PANCAM",
        rover_id: 7,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/p/010/2P127248158EDN0211P2216L5M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 395872,
      sol: 10,
      camera: {
        id: 30,
        name: "PANCAM",
        rover_id: 7,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/p/010/2P127248181EDN0211P2216L6M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 395873,
      sol: 10,
      camera: {
        id: 30,
        name: "PANCAM",
        rover_id: 7,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/p/010/2P127248205EDN0211P2216R7M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 395874,
      sol: 10,
      camera: {
        id: 30,
        name: "PANCAM",
        rover_id: 7,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/p/010/2P127248343EDN0211P2216L5M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 395875,
      sol: 10,
      camera: {
        id: 30,
        name: "PANCAM",
        rover_id: 7,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/p/010/2P127248366EDN0211P2216L6M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 395876,
      sol: 10,
      camera: {
        id: 30,
        name: "PANCAM",
        rover_id: 7,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/p/010/2P127248390EDN0211P2216R7M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 395877,
      sol: 10,
      camera: {
        id: 30,
        name: "PANCAM",
        rover_id: 7,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/p/010/2P127248533EDN0211P2216L5M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 395878,
      sol: 10,
      camera: {
        id: 30,
        name: "PANCAM",
        rover_id: 7,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/p/010/2P127248565EDN0211P2216L6M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 395879,
      sol: 10,
      camera: {
        id: 30,
        name: "PANCAM",
        rover_id: 7,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/p/010/2P127248588EDN0211P2216R7M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 395880,
      sol: 10,
      camera: {
        id: 30,
        name: "PANCAM",
        rover_id: 7,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/p/010/2P127254726EDN0214P2137L2M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 395881,
      sol: 10,
      camera: {
        id: 30,
        name: "PANCAM",
        rover_id: 7,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/p/010/2P127254768EDN0214P2137L5M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 395882,
      sol: 10,
      camera: {
        id: 30,
        name: "PANCAM",
        rover_id: 7,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/p/010/2P127254819EDN0214P2137L6M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 395883,
      sol: 10,
      camera: {
        id: 30,
        name: "PANCAM",
        rover_id: 7,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/p/010/2P127254873EDN0214P2137L3M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 395884,
      sol: 10,
      camera: {
        id: 30,
        name: "PANCAM",
        rover_id: 7,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/p/010/2P127254903EDN0214P2137L4M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 395885,
      sol: 10,
      camera: {
        id: 30,
        name: "PANCAM",
        rover_id: 7,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/p/010/2P127255015EDN0214P2137R2M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 395886,
      sol: 10,
      camera: {
        id: 30,
        name: "PANCAM",
        rover_id: 7,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/p/010/2P127255161EDN0214P2137R3M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 395887,
      sol: 10,
      camera: {
        id: 30,
        name: "PANCAM",
        rover_id: 7,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/p/010/2P127255232EDN0214P2137R4M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 395888,
      sol: 10,
      camera: {
        id: 30,
        name: "PANCAM",
        rover_id: 7,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/p/010/2P127255303EDN0214P2137R5M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 395889,
      sol: 10,
      camera: {
        id: 30,
        name: "PANCAM",
        rover_id: 7,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/p/010/2P127255324EDN0214P2137R6M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 395890,
      sol: 10,
      camera: {
        id: 30,
        name: "PANCAM",
        rover_id: 7,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/p/010/2P127255396EDN0214P2137R7M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 395891,
      sol: 10,
      camera: {
        id: 30,
        name: "PANCAM",
        rover_id: 7,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/p/010/2P127255893EDN0214P2104L2M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 395892,
      sol: 10,
      camera: {
        id: 30,
        name: "PANCAM",
        rover_id: 7,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/p/010/2P127255924EDN0214P2104L7M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 395893,
      sol: 10,
      camera: {
        id: 30,
        name: "PANCAM",
        rover_id: 7,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/p/010/2P127255978EDN0214P2102L2M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 395894,
      sol: 10,
      camera: {
        id: 30,
        name: "PANCAM",
        rover_id: 7,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/p/010/2P127256024EDN0214P2102L7M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 395895,
      sol: 10,
      camera: {
        id: 30,
        name: "PANCAM",
        rover_id: 7,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/p/010/2P127264062EDN0224P2104L2M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 395896,
      sol: 10,
      camera: {
        id: 30,
        name: "PANCAM",
        rover_id: 7,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/p/010/2P127264094EDN0224P2104L7M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 395897,
      sol: 10,
      camera: {
        id: 30,
        name: "PANCAM",
        rover_id: 7,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/p/010/2P127264139EDN0224P2102L2M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 395898,
      sol: 10,
      camera: {
        id: 30,
        name: "PANCAM",
        rover_id: 7,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/p/010/2P127264170EDN0224P2102L7M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 395899,
      sol: 10,
      camera: {
        id: 30,
        name: "PANCAM",
        rover_id: 7,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/p/010/2P127248663ESF0211P2095L2M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 395900,
      sol: 10,
      camera: {
        id: 30,
        name: "PANCAM",
        rover_id: 7,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/p/010/2P127248694ESF0211P2095L5M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 395901,
      sol: 10,
      camera: {
        id: 30,
        name: "PANCAM",
        rover_id: 7,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/p/010/2P127248726ESF0211P2095L6M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 395902,
      sol: 10,
      camera: {
        id: 30,
        name: "PANCAM",
        rover_id: 7,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/p/010/2P127248747ESF0211P2095R2M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 395903,
      sol: 10,
      camera: {
        id: 30,
        name: "PANCAM",
        rover_id: 7,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/p/010/2P127248778ESF0211P2095R7M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 395904,
      sol: 10,
      camera: {
        id: 30,
        name: "PANCAM",
        rover_id: 7,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/p/010/2P127255483ESF0214P2110L2M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 395905,
      sol: 10,
      camera: {
        id: 30,
        name: "PANCAM",
        rover_id: 7,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/p/010/2P127255514ESF0214P2110L5M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 395906,
      sol: 10,
      camera: {
        id: 30,
        name: "PANCAM",
        rover_id: 7,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/p/010/2P127255544ESF0214P2110L6M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 395907,
      sol: 10,
      camera: {
        id: 30,
        name: "PANCAM",
        rover_id: 7,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/p/010/2P127255565ESF0214P2110L1M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 395908,
      sol: 10,
      camera: {
        id: 30,
        name: "PANCAM",
        rover_id: 7,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/p/010/2P127255595ESF0214P2110L3M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 395909,
      sol: 10,
      camera: {
        id: 30,
        name: "PANCAM",
        rover_id: 7,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/p/010/2P127255625ESF0214P2110L4M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 395910,
      sol: 10,
      camera: {
        id: 30,
        name: "PANCAM",
        rover_id: 7,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/p/010/2P127255655ESF0214P2110L7M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 395911,
      sol: 10,
      camera: {
        id: 30,
        name: "PANCAM",
        rover_id: 7,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/p/010/2P127255697ESF0214P2110R2M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 395912,
      sol: 10,
      camera: {
        id: 30,
        name: "PANCAM",
        rover_id: 7,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/p/010/2P127255729ESF0214P2110R1M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 395913,
      sol: 10,
      camera: {
        id: 30,
        name: "PANCAM",
        rover_id: 7,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/p/010/2P127255760ESF0214P2110R3M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 395914,
      sol: 10,
      camera: {
        id: 30,
        name: "PANCAM",
        rover_id: 7,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/p/010/2P127255790ESF0214P2110R4M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 395915,
      sol: 10,
      camera: {
        id: 30,
        name: "PANCAM",
        rover_id: 7,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/p/010/2P127255810ESF0214P2110R5M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 395916,
      sol: 10,
      camera: {
        id: 30,
        name: "PANCAM",
        rover_id: 7,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/p/010/2P127255840ESF0214P2110R6M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
    {
      id: 395917,
      sol: 10,
      camera: {
        id: 30,
        name: "PANCAM",
        rover_id: 7,
        full_name: "Panoramic Camera",
      },
      img_src:
        "http://mars.nasa.gov/mer/gallery/all/2/p/010/2P127255870ESF0214P2110R7M1-BR.JPG",
      earth_date: "2004-01-14",
      rover: {
        id: 7,
        name: "Spirit",
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        status: "complete",
      },
    },
  ],
};

// your API calls

// example API call
app.get("/roverinfo", async (req, res) => {
  try {
    // let rover = await fetch(
    //   `https://api.nasa.gov/mars-photos/api/v1/rovers/${req.query.RoverName}?api_key=${process.env.API_KEY}`
    // ).then((res) => res.json());
    let rover = {};
    switch (req.query.RoverName) {
      case "curiosity":
        rover = mocCuriosityInfo.rover;

        break;
      case "opportunity":
        rover = mocOpportunityInfo.rover;

        break;
      case "spirit":
        rover = mocSpiritInfo.rover;
        break;
      default:
        break;
    }
    // let rover = mocCuriosityInfo.rover;

    res.send({ rover });
  } catch (err) {
    console.log("error:", err);
  }
});

app.get("/roverPhotos", async (req, res) => {
  try {
    // let rover = await fetch(
    //   `https://api.nasa.gov/mars-photos/api/v1/rovers/${req.query.RoverName}/photos?sol=10&api_key=${process.env.API_KEY}`
    // ).then((res) => res.json());
    let data = {};
    switch (req.query.RoverName) {
      case "curiosity":
        data = mocCuriosityPhotos;

        break;
      case "opportunity":
        data = mocOpportunityPhotos;

        break;
      case "spirit":
        data = mocSpiritPhotos;
        break;
      default:
        break;
    }
    let photos = data.photos.map((x) => {
      return {
        Id: x.id,
        UrlPhoto: x.img_src,
        DateTaken: x.earth_date,
        Camera: x.camera.full_name,
      };
    });
    res.send(Immutable.List(photos));
  } catch (err) {
    console.log("error:", err);
  }
});

app.get("/apod", async (req, res) => {
  try {
    let image = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=${process.env.API_KEY}`
    ).then((res) => res.json());
    res.send({ image });
  } catch (err) {
    console.log("error:", err);
  }
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

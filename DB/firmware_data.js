// DB/firmware_data.js - Contains all compatibility data arrays

const fwDataPS5Digital = [
    { fwRange: "1.00–5.50", webkit: "working", lua: "not working", y2jb: "working", bd: "not working" },
    { fwRange: "6.00–7.61", webkit: "not working", lua: "not working", y2jb: "working", bd: "not working" },
    { fwRange: "8.00–10.01", webkit: "not working", lua: "not working", y2jb: "working", bd: "not working" },
    { fwRange: "10.20–11.60", webkit: "not working", lua: "not working", y2jb: "Not Confirmed Yet", bd: "not working" },
    { fwRange: "12.00–12.02", webkit: "not working", lua: "not working", y2jb: "Not Confirmed Yet", bd: "not working" },
    { fwRange: "12.20-12.xx", webkit: "not working", lua: "not working", y2jb: "Not Confirmed Yet", bd: "not working" },
];

const fwDataPS5Disk = [
    { fwRange: "1.00–5.50", webkit: "working", lua: "working", y2jb: "working", bd: "working" },
    { fwRange: "6.00–7.61", webkit: "not working", lua: "working", y2jb: "working", bd: "working" },
    { fwRange: "8.00–10.01", webkit: "not working", lua: "working", y2jb: "working", bd: "working" },
    { fwRange: "10.20–12.00", webkit: "not working", lua: "Not Confirmed Yet", y2jb: "Not Confirmed Yet", bd: "working" },
    { fwRange: "12.20–12.xx", webkit: "not working", lua: "Not Confirmed Yet", y2jb: "Not Confirmed Yet", bd: "not working" }
];

const fwDataPS4 = [
    { fwRange: "5.05", webkit: "working", lua: "working", y2jb: "working", bd: "working" },
    { fwRange: "6.72", webkit: "working", lua: "working", y2jb: "working", bd: "working" },
    { fwRange: "7.00 / 7.02 / 7.50 / 7.55", webkit: "working", lua: "working", y2jb: "working", bd: "working" },
    { fwRange: "8.00 / 8.01 / 8.03 / 8.50", webkit: "working", lua: "working", y2jb: "working", bd: "working" },
    { fwRange: "9.00", webkit: "working", lua: "working", y2jb: "working", bd: "working" },
    { fwRange: "9.03", webkit: "working", lua: "working", y2jb: "working", bd: "working" },
    { fwRange: "9.04 / 9.50 / 9.51", webkit: "working", lua: "working", y2jb: "working", bd: "working" },
            { fwRange: "9.60", webkit: "working", lua: "working", y2jb: "working", bd: "working" },
    { fwRange: "10.00 / 10.01 / 10.50 / 10.70 / 10.71 / 11.00", webkit: "working", lua: "working", y2jb: "working", bd: "working" },
    { fwRange: "11.02 / 11.50 / 11.52 / 12.00 / 12.02", webkit: "working", lua: "working", y2jb: "working", bd: "working" },
    { fwRange: "12.50", webkit: "working", lua: "working", y2jb: "working", bd: "working" },
    { fwRange: "12.52", webkit: "not working", lua: "Not Confirmed Yet", y2jb: "Not Confirmed Yet", bd: "not working" },
    { fwRange: "13.00", webkit: "not working", lua: "Not Confirmed Yet", y2jb: "Not Confirmed Yet", bd: "not working" },
    { fwRange: "13.02", webkit: "not working", lua: "Not Confirmed Yet", y2jb: "Not Confirmed Yet", bd: "not working" }
];
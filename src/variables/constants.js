export const constants = {
  // BASE_URL: "http://localhost:3000",
  BASE_URL: "http://16.171.171.55:3000/",

  ERRORCODE: {
    422: "422",
    400: "400",
    409: "409",
    401: "401",
    404: "404",
  },

  ERROR_MESSAGE: {
    serviceNotFound: "Lütfen lokasyon seçiniz.",
    serviceCountMoreThanOne: "Sadece 1 adet lokasyon seçiniz.",
  },

  REMEMBERME: "isRememberMe",

  USERID: "id",

  SUCCESS_MESSAGE: {
    loginSuccess: "Giriş başarılı",
    commonMessage: "İşlem başarılı",
  },

  ERROR_CODE: {
    422: "422",
    400: "400",
  },
  TOKEN: "token",

  GROUPID: "groupId",

  PAGESIZE_INPERMISSION_PAGE: 10,
  PAGESIZE_IN_PERSON_PAGE: 10,
};

export const CalendarTypes = {
  Nobet: 1,
  Izin: 2,
  Rapor: 3,
  Gebelik: 4,
  ResmiTatil: 5,
  IdariIzin: 6,
  OzelDurum: 7,
  Rotasyon: 8,
  Yayin: 9,
};

export const CalendarStatus = {
  WaitingForApprove: 1,
  Approve: 2,
  Reject: 3,
};

export const listOfColorName = [
  "primary",
  "secondary",
  "success",
  "info",
  "warning",
  "danger",
  "light",
  "dark",
  "default",
  "indigo",
  "cyan",
  "gray",
  "lighter",
  "red",
  "orange",
  "yellow",
  "olive",
  "green",
  "teal",
  "blue",
  "purple",
  "pink",
];

export const roleType = {
  User: "User",
  Manager: "Manager",
  Admin: "Admin",
  SuperAdmin: "SuperAdmin",
};

export const holidays = {
  2020: {
    1: [1],
    4: [23],
    5: [1, 24, 25, 26, 19],
    7: [15, 31],
    8: [1, 2, 3, 30],
    10: [29],
  },
  2021: {
    1: [1],
    4: [23],
    5: [1, 13, 14, 15, 19],
    7: [15, 20, 21, 22, 23],
    8: [30],
    10: [29],
  },
  2022: {
    1: [1],
    4: [23],
    5: [1, 2, 3, 4, 19],
    7: [9, 10, 11, 12, 15],
    8: [30],
    10: [29],
  },
  2023: {
    1: [1],
    4: [21, 22, 23],
    5: [1, 19],
    6: [28, 29, 30],
    7: [1, 15],
    8: [30],
    10: [29],
  },
  2024: {
    1: [1],
    4: [10, 11, 12, 23],
    5: [1, 19],
    6: [16, 17, 18, 19],
    7: [15],
    8: [30],
    10: [29],
  },
  2025: {
    1: [1],
    3: [30, 31],
    4: [1, 23],
    5: [1, 19],
    6: [6, 7, 8, 9],
    7: [15],
    8: [30],
    10: [29],
  },
  2026: {
    1: [1],
    3: [20, 21, 22],
    4: [23],
    5: [1, 19, 27, 28, 29, 30],
    7: [15],
    8: [30],
    10: [29],
  },
  2027: {
    1: [1],
    3: [9, 10, 11],
    4: [23],
    5: [1, 16, 17, 18, 19],
    7: [15],
    8: [30],
    10: [29],
  },
  2028: {
    1: [1],
    4: [23],
    5: [1, 19],
    7: [15],
    8: [30],
    10: [29],
  },
  2029: {
    1: [1],
    4: [23],
    5: [1, 19],
    7: [15],
    8: [30],
    10: [29],
  },
  2030: {
    1: [1],
    4: [23],
    5: [1, 19],
    7: [15],
    8: [30],
    10: [29],
  },
};

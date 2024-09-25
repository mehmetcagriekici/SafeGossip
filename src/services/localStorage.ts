/**
 * !!!!! READ THIS !!!!
 * This file is only for the demo and presentation versions of the app. The data structure created in this file built only for this specific version of the app. For later versions, please create a new data structure specified for the server that will be assigned for this application.
 * ---------------------------------------
 * Demo Data
 * There is only one single data object for the entire app. All of the functions inside this app, gets the data object, update the related part of the data, and send all of the data to the local storage.
 * No images in demo version
 */

export interface DemoData {
  keys: {
    [key: string]: {
      visiual: { ratings: string[]; attachments: string[] };
      behavior: { ratings: string[]; attachments: string[] };
      intelligence: { ratings: string[]; attachments: string[] };
      arbitraryAttachments: string[];
    };
  };
}

export type SumData = {
  visualRatings: string[];
  visualAttachments: string[];
  behaviorRatings: string[];
  behaviorAttachments: string[];
  intelligenceRatings: string[];
  intelligenceAttachments: string[];
  arbitraryAttachments: string[];
};

//save to local storage
export function sendToLocalStorage(data: DemoData) {
  const dataString = JSON.stringify(data);
  localStorage.setItem("demo_gossip_data", dataString);
}

//get from local storage
export function getFromLocalStorage(): DemoData {
  const dataString = localStorage.getItem("demo_gossip_data");

  if (dataString) {
    const data = JSON.parse(dataString);
    return data;
  }

  return { keys: {} };
}

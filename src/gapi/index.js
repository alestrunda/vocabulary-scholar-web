/*global window*/

//create empty file, only set file meta
export const gapiCreateAppFile = fileName =>
  window.gapi.client.drive.files.create({
    name: fileName,
    parents: ['appDataFolder'],
    mimeType: 'application/json',
  });

//get the app file, returns promise
export const gapiGetAppFileID = fileName =>
  window.gapi.client.drive.files
    .list({
      spaces: 'appDataFolder',
      pageSize: 1, //app uses only one file
      fields: 'files(id, name)', //specify which fields should api return
    })
    .then(response => {
      const appStateFileIDs = response.result.files
        .filter(file => file.name === fileName)
        .map(file => file.id);
      return appStateFileIDs[0];
    });

//load file content
export const gapiGetFileContentByID = fileID =>
  window.gapi.client.drive.files.get({
    fileId: fileID,
    alt: 'media',
  });

export const gapiSignIn = () => window.gapi.auth2.getAuthInstance().signIn();

export const gapiSignOut = () => window.gapi.auth2.getAuthInstance().signOut();

//update file content
export const gapiUpdateFile = (fileID, fileContentJson) =>
  window.gapi.client.request({
    path: `/upload/drive/v3/files/${fileID}`,
    method: 'PATCH',
    params: { uploadType: 'media' },
    body: fileContentJson,
  });

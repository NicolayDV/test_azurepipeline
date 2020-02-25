import axios from 'axios';
import { Dropbox } from 'dropbox'

const dbx = new Dropbox({
    accessToken: 'AdoUFu3jHwAAAAAAAAAAFfzAWnghCNdFD4uckBr0K_Xt55FX66heqZvOw9djlggv',
    fetch
})

export default class Api {

    static get defaultOptions() {
        return {
            baseUrl: null,
            listUrl: null,
            downloadUrl: null,
            uploadUrl: null,
            axiosOptions: {}
        };
    }

    constructor(opts) {
        this.options = { ...this.constructor.defaultOptions, ...opts};

        if (this.options.baseUrl) {
            this.options.axiosOptions.baseURL = this.options.baseUrl;
        }

        this.axios = axios.create(this.options.axiosOptions);
    }

    list(pathm) {

        console.log("PATH =", pathm);

        dbx.filesDownload({
            path: '/prueba1/foto2.png'
        }).then(function (response) {
            console.log(response)
        })
        .catch(function (error) {
            console.error('dropbox error', error)
        });

        return dbx.filesListFolder({
            path: pathm
        });

        // return this.axios.get(this.options.listUrl, { params: { path: this.path } });
    }

    upload(data, config) {
        
        console.log("DATA UPLOAD =", data);
        console.log("CONFIG UPLOAD =", config);

        return dbx.filesUpload({path: data, contents: config})
        .then(function (response) {
            console.log(response)
        })
        .catch(function (error) {
            console.error('dropbox error', error)
        });

        // return dbx.filesUpload({
        //     data: datam,
        //     config: configm,
        // });
        
        // return this.axios.post('https://content.dropboxapi.com/2/files/upload', data, config);
    }

    downloadUrl(file) {

        console.log("download url =", file.path_lower);

        return dbx.filesDownload({
            path: file.path_lower
        });
        // TODO : proper
        // if (this.options.downloadUrl)
        //     return this.options.downloadUrl+'?path='+file.path;
    }

}
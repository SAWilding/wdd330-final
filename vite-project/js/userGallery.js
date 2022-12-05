import DataService from "./dataService";

const service = new DataService("userData");

const users = await service.getData();

const userId = sessionStorage.getItem("user");




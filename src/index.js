var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var carService = {
    getAll: function () { return fetch('http://owu.linkpc.net/carsAPI/v1/cars').then(function (res) { return res.json(); }); },
    create: function (car) { return fetch('http://owu.linkpc.net/carsAPI/v1/cars', {
        method: "POST",
        body: JSON.stringify(car),
        headers: { "Content-type": "application/JSON" }
    }).then(function (res) { return res.json(); }); },
    deleteById: function (id) { return fetch("http://owu.linkpc.net/carsAPI/v1/cars/".concat(id), {
        method: "DELETE"
    }); }
};
var renderCar = /** @class */ (function () {
    function renderCar() {
    }
    renderCar.run = function () {
        this._initForm();
        this._carsShow();
        this._carsFilter(); //method for searching the car(s) by specific condition
    };
    ;
    renderCar._carsShow = function () {
        return __awaiter(this, void 0, void 0, function () {
            var cars, carsDiv, url;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, carService.getAll()];
                    case 1:
                        cars = _a.sent();
                        carsDiv = document.querySelector('#carsDiv');
                        carsDiv.innerText = '';
                        url = new URL(location.href);
                        cars.forEach(function (car) {
                            var id = car.id, brand = car.brand, price = car.price, year = car.year;
                            var carItem = document.createElement('div');
                            carItem.innerText = "".concat(id, " ").concat(brand, " -- ").concat(year, " -- ").concat(price);
                            var btn = document.createElement('button');
                            btn.innerText = 'delete';
                            btn.onclick = function () { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, carService.deleteById(id)];
                                        case 1:
                                            _a.sent();
                                            this._carsShow();
                                            return [2 /*return*/];
                                    }
                                });
                            }); };
                            //------- Show individual car's information -----
                            //add a button "car's info" to car's list
                            var carInfoBtn = document.createElement('button');
                            var chooseCarsDiv = document.getElementById('chooseCarsDiv');
                            carInfoBtn.innerText = "car's info";
                            //Show only car's information when onclick event is called
                            carInfoBtn.onclick = function () {
                                carsDiv.innerText = '';
                                carItem.innerText = "id: ".concat(id, ",   model:").concat(brand, ",   made at: ").concat(year, ",   price: ").concat(price, "   .");
                                chooseCarsDiv.style.display = 'none';
                                // add a button '<< Home >>' to return back
                                var prevLink = document.createElement('a');
                                // @ts-ignore
                                prevLink.href = url;
                                prevLink.innerText = '<< Home >>';
                                carItem.appendChild(prevLink);
                                carsDiv.append(carItem);
                            };
                            carItem.append(btn, carInfoBtn);
                            carsDiv.append(carItem);
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    renderCar._initForm = function () {
        var _this = this;
        var form = document.forms.namedItem('form');
        var brand = form.brand;
        var price = form.price;
        var year = form.year;
        form.onsubmit = function (e) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        e.preventDefault();
                        return [4 /*yield*/, carService.create({ brand: brand.value, price: +price.value, year: +year.value })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this._carsShow()];
                    case 2:
                        _a.sent();
                        form.reset();
                        return [2 /*return*/];
                }
            });
        }); };
    };
    // Filter for car(s) if at least 1 condition for searching is true
    renderCar._carsFilter = function () {
        return __awaiter(this, void 0, void 0, function () {
            var cars, carsFilterDiv, notCarFoundDiv, carFilterForm, filterBtn, brandInput, priceInput, yearInput;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, carService.getAll()];
                    case 1:
                        cars = _a.sent();
                        carsFilterDiv = document.getElementById('carsFilterDiv');
                        notCarFoundDiv = document.getElementById('notCarFoundDiv');
                        carFilterForm = document.forms.namedItem('carFilter');
                        filterBtn = document.getElementById('filterBtn');
                        brandInput = carFilterForm.choose_brand;
                        priceInput = carFilterForm.choose_price;
                        yearInput = carFilterForm.choose_year;
                        filterBtn.onclick = function (e) {
                            e.preventDefault();
                            carsFilterDiv.innerText = '';
                            notCarFoundDiv.innerText = '';
                            //if at least 1 condition is true , seaching gives a positive result
                            // @ts-ignore
                            var carsFilter = cars.filter(function (car) {
                                var id = car.id, brand = car.brand, price = car.price, year = car.year;
                                if (car.brand.toLowerCase() === brandInput.value.toLowerCase() ||
                                    car.price === +priceInput.value || car.year === +yearInput.value) {
                                    var carItemDiv = document.createElement('div');
                                    carItemDiv.innerText = "id: ".concat(id, ",   model:").concat(brand, ",   made at: ").concat(year, ",   price: ").concat(price);
                                    carsFilterDiv.append(carItemDiv);
                                    return car;
                                }
                            });
                            // if nothing is found (array carsFilter is empty) the below message will be appeared
                            if (!carsFilter.length) {
                                notCarFoundDiv.innerText = "Nothing found or incorrect searching conditions !";
                            }
                            carFilterForm.reset();
                        };
                        return [2 /*return*/];
                }
            });
        });
    };
    return renderCar;
}());
renderCar.run();
// carService.create({brand: 'Toyota', year: 2012, price: 13000}).then(values => console.log(values));
carService.getAll().then(function (cars) { return console.log(cars); });

interface ICar {
   id?: number,
   brand: string,
   year: number,
   price: number
}

const carService = {
    getAll: ():Promise<ICar[]> => fetch('http://owu.linkpc.net/carsAPI/v1/cars').then(res => res.json()),
    create: (car: ICar):Promise<ICar> => fetch('http://owu.linkpc.net/carsAPI/v1/cars', {
        method: "POST",
        body: JSON.stringify(car),
        headers: {"Content-type": "application/JSON"}
    }).then(res => res.json()),
    deleteById: (id: number):Promise<Response> => fetch(`http://owu.linkpc.net/carsAPI/v1/cars/${id}`, {
        method: "DELETE"
    })
}

class renderCar {
    static run() {
        this._initForm();
        this._carsShow();
    };

    private static async _carsShow(): Promise<void> {
        const cars = await carService.getAll();
        const carsDiv = document.querySelector('#carsDiv') as HTMLDivElement;
       carsDiv.innerText = '';

        const url = new URL(location.href);
        console.log(url);
        cars.forEach(car => {
            const {id, brand, price, year} = car;
            const carItem = document.createElement('div') as HTMLDivElement;
            carItem.innerText = `${id} ${brand} -- ${year} -- ${price}`;

            const btn = document.createElement('button') as HTMLButtonElement;

            btn.innerText = 'delete';
            btn.onclick = async (): Promise<void> => {
                await carService.deleteById(id!);
                this._carsShow();
            }

            //------- Show individual car's information -----

            //add a button "car's info" to car's list
            const carInfoBtn = document.createElement('button') as HTMLButtonElement;
            carInfoBtn.innerText = "car's info";

            //Show only car's information when onclick event is called
            carInfoBtn.onclick = async (): Promise<void> => {
                carsDiv.innerText = '';
                carItem.innerText = `${id} ${brand} -- ${year} -- ${price}`;

                // add a button '<< Home >>' to return back
                const prevLink = document.createElement('a');
                // @ts-ignore
                prevLink.href = url;
                prevLink.innerText = '<< Home >>';
                carItem.appendChild(prevLink)
                carsDiv.append(carItem);
            }
            carItem.append(btn, carInfoBtn);
            carsDiv.append(carItem);
        })
    }

    private static _initForm(): void {
        const form = document.forms.namedItem('form') as HTMLFormElement;
        const brand = form.brand as HTMLInputElement;
        const price = form.price as HTMLInputElement;
        const year = form.year as HTMLInputElement;

        form.onsubmit = async (e: SubmitEvent)=> {
            e.preventDefault();
            await carService.create({brand: brand.value, price: +price.value, year: +year.value});
            await this._carsShow();
            form.reset();

        }
    }
}

renderCar.run();

// carService.create({brand: 'Toyota', year: 2012, price: 13000}).then(values => console.log(values));
carService.getAll().then(cars => console.log(cars));

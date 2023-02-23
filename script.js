const battery =
    [{
        "batteryName": "WKL-78",
        "capacityAh": 2.3,
        "voltage": 14.4,
        "maxDraw": 3.2,
        "endVoltage": 10,
    },
    {
        "batteryName": "WKL-140",
        "capacityAh": 4.5,
        "voltage": 14.4,
        "maxDraw": 9.2,
        "endVoltage": 5,
    },
    {
        "batteryName": "Wmacro-78",
        "capacityAh": 2.5,
        "voltage": 14.5,
        "maxDraw": 10,
        "endVoltage": 5,
    },
    {
        "batteryName": "Wmacro-140",
        "capacityAh": 3.6,
        "voltage": 14.4,
        "maxDraw": 14,
        "endVoltage": 5,
    },
    {
        "batteryName": "IOP-E78",
        "capacityAh": 6.6,
        "voltage": 14.4,
        "maxDraw": 10.5,
        "endVoltage": 8,
    },
    {
        "batteryName": "IOP-E140",
        "capacityAh": 9.9,
        "voltage": 14.4,
        "maxDraw": 14,
        "endVoltage": 10,
    },
    {
        "batteryName": "IOP-E188",
        "capacityAh": 13.2,
        "voltage": 14.4,
        "maxDraw": 14,
        "endVoltage": 11,
    },
    {
        "batteryName": "RYN-C65",
        "capacityAh": 4.9,
        "voltage": 14.8,
        "maxDraw": 4.9,
        "endVoltage": 11,
    },
    {
        "batteryName": "RYN-C85",
        "capacityAh": 6.3,
        "voltage": 14.4,
        "maxDraw": 6.3,
        "endVoltage": 12,
    },
    {
        "batteryName": "RYN-C140",
        "capacityAh": 9.8,
        "voltage": 14.8,
        "maxDraw": 10,
        "endVoltage": 12,
    },
    {
        "batteryName": "RYN-C290",
        "capacityAh": 19.8,
        "voltage": 14.4,
        "maxDraw": 14,
        "endVoltage": 12,
    }]
;

const camera =
    [{
        "brand": "Cakon",
        "model": "ABC 3000M",
        "powerConsumptionWh": 35.5,
    },
    {
        "brand": "Cakon",
        "model": "ABC 5000M",
        "powerConsumptionWh": 37.2,
    },
    {
        "brand": "Cakon",
        "model": "ABC 7000M",
        "powerConsumptionWh": 39.7,
    },
    {
        "brand": "Cakon",
        "model": "ABC 9000M",
        "powerConsumptionWh": 10.9,
    },
    {
        "brand": "Cakon",
        "model": "ABC 9900M",
        "powerConsumptionWh": 15.7,
    },
    {
        "brand": "Go MN",
        "model": "UIK 110C",
        "powerConsumptionWh": 62.3,
    },
    {
        "brand": "Go MN",
        "model": "UIK 210C",
        "powerConsumptionWh": 64.3,
    },
    {
        "brand": "Go MN",
        "model": "UIK 230C",
        "powerConsumptionWh": 26.3,
    },
    {
        "brand": "Go MN",
        "model": "UIK 250C",
        "powerConsumptionWh": 15.3,
    },
    {
        "brand": "Go MN",
        "model": "UIK 270C",
        "powerConsumptionWh": 20.3,
    },
    {
        "brand": "VANY",
        "model": "CEV 1100P",
        "powerConsumptionWh": 22,
    },
    {
        "brand": "VANY",
        "model": "CEV 1300P",
        "powerConsumptionWh": 23,
    },
    {
        "brand": "VANY",
        "model": "CEV 1500P",
        "powerConsumptionWh": 24,
    },
    {
        "brand": "VANY",
        "model": "CEV 1700P",
        "powerConsumptionWh": 25,
    },
    {
        "brand": "VANY",
        "model": "CEV 1900P",
        "powerConsumptionWh": 26,
    }]
;

class Camera {
    
    constructor(brand, model, powerConsumptionWh) {
        this.brand = brand,
        this.model = model,
        this.powerConsumptionWh = powerConsumptionWh
    }

    getBrandModel(value) {
        if(this.brand == value) {
            let setBrandModel = 
            `
                <option value="${this.model}">${this.model}</option>
            `;
            document.getElementById("model-select").innerHTML += setBrandModel;
        }
    }
}

class Battery {

    constructor(batteryName, capacityAh, voltage, maxDraw, endVoltage) {
        this.batteryName = batteryName;
        this.capacityAh = capacityAh;
        this.voltage = voltage;
        this.maxDraw = maxDraw;
        this.endVoltage = endVoltage;
    }

    // batteryの消費電力を返す
    getPowerConsumption() {
        return this.endVoltage * this.maxDraw;
    }

    // 満充電時のバッテリーの消費電力 ※ 小数点第2で四捨五入を実施
    getMaxChargeTime(PowerConsumption) {
        return Math.round((this.voltage * this.capacityAh) / PowerConsumption * 10) / 10
    }

    // batteryのHTMLを返す
    getBatteryHtml(maxChargeTime) {
        
        let batteryHtml = 
        `
        <div class="w-100 bg-light border border-secondary d-flex flex-row justify-content-between align-items-center">
            <p class="m-0 pt-2 pb-2 pl-2">
                <strong>${this.batteryName}</strong>
                </p>
            <p class="m-0 pt-2 pb-2 pr-2">Estimate ${maxChargeTime} hours</p>
        </div>
        `;

        return batteryHtml;
    }
}


// step2を変更した際にBatteryをアップデートする
function selectBatteryList(batteryObject, cameraObject) {
    // batteryの一覧を削除
    document.getElementById("battery-list").innerHTML =　 "";

    // 変数を用意する
    let cameraPowerConsumption = "";
    let selectModel = document.getElementById("model-select").value;
    let selectAccessoryPower = parseInt(document.getElementById("wattage").value);

    // カメラの消費電力が分かれば良い
    for(let i = 0; i < cameraObject.length; i++) {
        if(cameraObject[i]["model"] == selectModel) {
            cameraPowerConsumption = cameraObject[i]["powerConsumptionWh"] + selectAccessoryPower;
        }
    }

    // batteryを一覧に表示する
    for(let i = 0; i < batteryObject.length; i++) {
        // バッテリーの消費電力
        let batteryPowerConsumption = batteryObject[i].getPowerConsumption();
        // 満充電時のバッテリーの消費電力 ※ 小数点第2で四捨五入を実施
        let maxChargeTime = batteryObject[i].getMaxChargeTime(cameraPowerConsumption);

        // 満たしているバッテリーだけ表示する
        if(batteryPowerConsumption > cameraPowerConsumption) {
            document.getElementById("battery-list").innerHTML += batteryObject[i].getBatteryHtml(maxChargeTime);
        }
    }
}

// cameraをオブジェクトとして配列に入れる
let cameraObject = [];
for(let i = 0; i < camera.length; i++) {

    cameraObject.push(new Camera(camera[i]["brand"], camera[i]["model"], camera[i]["powerConsumptionWh"]));
}

// batteryをオブジェクトとして配列に入れる
let batteryObject = [];

// battery並び替え
battery.sort(function(a,b){
    if(a.batteryName > b.batteryName) return 1;
    else return -1;
});
for(let i = 0; i < battery.length; i++) {
    batteryObject.push(new Battery(battery[i]["batteryName"], battery[i]["capacityAh"], battery[i]["voltage"], battery[i]["maxDraw"], battery[i]["endVoltage"]));
}


// brandがselectされたら実施する処理
document.getElementById("brand-select").addEventListener('change', function(){
    
    // イベントの最初に初期化する
    document.getElementById("model-select").innerHTML = "";

    // 変数を定義する
    let selectBrand = document.getElementById("brand-select").value;

    // step1の内容からstep2を表示する
    for(let i = 0; i < cameraObject.length; i++) {
        
        if(cameraObject[i]["brand"] == selectBrand) {
            cameraObject[i].getBrandModel(selectBrand);
        }
    }

    // batteryを一覧に表示する
    selectBatteryList(batteryObject, cameraObject);
})


// modelが選択されて実施する処理
document.getElementById("model-select").addEventListener("change", function() {
    selectBatteryList(batteryObject, cameraObject);
})

// accessory powerが変更されて時の処理
document.getElementById("wattage").addEventListener("change", function() {
    selectBatteryList(batteryObject, cameraObject);
})

// 初回のbatteryList
selectBatteryList(batteryObject, cameraObject)
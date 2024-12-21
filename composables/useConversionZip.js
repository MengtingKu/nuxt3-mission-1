export const useConversionZip = () => {
    const postalCodes = {
        高雄市: {
            前金區: 801,
            鹽埕區: 802,
            新興區: 800,
        },
        臺北市: {
            中正區: 100,
            大同區: 103,
        },
        臺中市: {
            南區: 402,
            西區: 403,
        },
    };

    const updateZipCode = (city, district) => {
        if (!postalCodes[city] || !postalCodes[city][district]) return null;

        return postalCodes[city][district];
    };

    const findAreaByZipCode = zip => {
        for (const [city, districtObj] of Object.entries(postalCodes)) {
            for (const [district, zipCode] of Object.entries(districtObj))
                if (zipCode === zip) {
                    return `${city}${district}`;
                }
        }

        return null;
    };

    return { updateZipCode, findAreaByZipCode };
};

let options = [];

const configure = (p) => {
    p.forEach(o => {
        o["paymentData"] = configureOption(o);
        options.push(o);
    });

    return options;
}

const configureOption = (p) => {
    if (p && p.fields ) {
        let data = {};
        p.fields.forEach(item => { 
            if (item && item.key) 
                data[item.key] = item.value || configureField(item); 
        });
        return data;
    }
};

const configureField = (i) => {
    if (i && i.details ) {
        let data = {};
        i.details.forEach(item => {
            if (item && item.key) 
                data[item.key] = item.value || configureField(item);
        });
		return data;
	}

    switch(i.type)
    {
        case 'boolean' : return false;
        case 'number' : return 0;
    }

    return '';
};

export const configurePayments = data => configure(data);
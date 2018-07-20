let options = [];

const configure = (p) => {
    p.forEach(o => {
        o.schema = getSchema(o) || {};
        o.getValue = function() {
            return getValue(this);
        };
        o.setValue = function(data) { 
            setValue(this, data);
        };
        options.push(o);
    });

    return options;
}

const getSchema = (method) => {

    if (method && method.fields ) {
        let data = {};
        method.fields.forEach(field => {
            if (field && field.key) {
                data[field.key] = { 
                    type: field.type, 
                    value: field.value, 
                    optional: field.optional };
            }     
        });
        return data;
	}
}

const getValue = (method) => {
    if (method && method.fields ) {
        let data = {};
        method.fields.forEach(field => {
            if (field && field.key) {
                data[field.key] = field.value || getValueRecursive(field);
            }
        });
        return data;
	}
}

const getValueRecursive = (o) => {
    let source = o.details || [];
    let data = {};
    let hasData = false;

    source.forEach(item => {
        if (item && item.key) {
            data[item.key] = item.value || getValue(item);
            hasData = true;
        }        
    });

    if (hasData) return data;

    switch (o.type)
    {
        case 'boolean' : return { type: 'boolean', value: false };
        case 'number' : return { type: 'boolean', value: 0 };
    }

    return '';
};

const setValue = (option, data) => {
    
    option.fields.forEach(f => {
        const val = data[f.key];
        if (val) {
            f.value = val;
        }
    });

    option.schema = getSchema(option);
};

export const loadPayments = data => configure(data);
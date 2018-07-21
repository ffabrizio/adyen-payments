let __options = [];
let __labels = {};

const configure = (options) => {
    options.forEach(o => {
        o.schema = getSchema(o) || {};
        o.getValue = function() {
            return getValue(this);
        };
        o.setValue = function(data) { 
            setValue(this, data);
        };
        __options.push(o);
    });

    return __options;
}

const getSchema = (method) => {
    if (method && method.fields ) {
        let data = {};
        method.fields.forEach(field => {
            if (field && field.key) {
                data[field.key] = { 
                    label: __labels[field.key] || field.key,
                    type: field.type, 
                    value: field.value, 
                    options: field.items || [],
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
        case 'boolean' : return false;
        case 'number' : return 0;
    }

    return '';
};

const setValue = (option, data) => {
    
    option.fields.forEach(f => {
        const val = data[f.key];
        if (f.type !== 'hidden') {
            f.value = val;
        }
    });

    option.schema = getSchema(option);
};

export const loadPayments = (options, labels) => {
    if (labels) __labels = labels;
    return configure(options);
}
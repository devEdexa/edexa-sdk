const { Bstamp } = require('./dist/');
const { DEFAULT_NETWORK } = require('./dist/util/constant');
const settings = { network: DEFAULT_NETWORK };
const authSettings = {
    headers: {
        'client-id': 'b1451bc9-4d8a-4e51-838c-c2341a1c13c3',
        'secret-key':
            'F7D866D57ACA8071817D28A49C81CDDEE74899492B11C2FE3FE9818368956DC91150C138AC46770B273FE8E7665C2D41DE1A11A728D318CB86BC4627C72FA58A',
    },
};

const bstamp = new Bstamp(settings);

bstamp.authenticate(authSettings).then(data => {
    console.log("helodata", data);
});

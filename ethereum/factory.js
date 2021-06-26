import web3 from './web3';
import campaignFactory from './build/CampaignFactory.json'

const instance = new web3.eth.Contract(
    JSON.parse(campaignFactory.interface),
    '0xDDB3b3ba752bBeA75243a52b3c16A2886b2B516E'
);

export default instance;
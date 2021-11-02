import ServiceUtils from './Utils/ServiceUtils';

class AccountService
{

    constructor()
    {
        this.utils = new ServiceUtils();
    }

    get()
    {
        const data =  [
            {'label': 'Conta 1', 'address': '0x6eBB978099af9Bd829F30fffcbDeb22D06685956'},
            {'label': 'Conta 2', 'address': '0x00A284f2aD5eCf18D966C8457ad9994E0f99C1f9'},
            {'label': 'Conta 3', 'address': '0x368703ad229b422Dc950b3922BdF97c51Af90120'},
            {'label': 'Conta 4', 'address': '0x029ec7F1A6F88375cC616F563bBe3EC9793F84A9'},
            {'label': 'Conta 5', 'address': '0x65AE1361fd056F411bB770F9d63cec7ceE9f06Fb'},
            {'label': 'Conta 6', 'address': '0xEf56576ebaf9Ce1fBEbBD0cB0D754d79867BBE11'},
            {'label': 'Conta 7', 'address': '0x7a20CB92834C28afd183e94e18065a28a33e1ce8'},
            {'label': 'Conta 8', 'address': '0xbf5e2D20A21ae4C0D4A5B7D9B2059aC49238778a'},
            {'label': 'Conta 9', 'address': '0xcB7462a8Fb0988fd0958feF2162e18830C9656a0'},
            {'label': 'Conta 10', 'address': '0x8cB1215744C7B0FAE74272880546A4A0a7D45Ce8'}
        ];

        return this.utils.response(data);
    }
}

export default AccountService;
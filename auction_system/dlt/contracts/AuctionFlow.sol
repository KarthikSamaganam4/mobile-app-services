pragma solidity ^0.5.0;


import "../../node_modules/openzeppelin-solidity/contracts/math/SafeMath.sol";


contract AuctionFlow {

    enum Role {member, owner, auctioner, DoesNotExist}
    
    using SafeMath for uint256;

    //mapping of the user address with user role

     mapping(address => Role) private _userRole;
    
    //mapping of user balances
    mapping(address => uint256) balanceRegistry;
    
    //mapping of user id and users
    
    mapping(address => User) userRegistry;
    
    //mapping of property id and address of the property
    
    mapping(bytes32 => address) propertyAddressRegistry;
    
    //mapping of auction id and auction objects
    
    mapping(bytes32 => Auction) auctionRegistry;
    
    //maping of bidID and bids
    
    mapping(bytes32 => Bid) bidRegistry;
    
    //mapping auctionId and array of bid bids
    
    mapping(bytes32 => bytes32[]) auctionBidIdRegistry;
    
    //mapping of bidId and auction id
    mapping(bytes32 => bytes32) bidAuctionIdRegistry;
    
    //mapping of auction id and bid id'S
    
    mapping(bytes32 => bytes32) winningBidRegistry;
    
    //mapping from auction id to selected users by the auctioner 
    
    mapping(bytes32 => mapping(address => bool)) auctionSelectedUsers;
    
    
    //events
    
    event UserCreated(bytes32 indexed _userId);
    event AuctionCreated(bytes32 indexed _auctionId);
    event BidPlaced(bytes32 indexed _bidId);
    event AuctionClosed(bytes32 indexed _auctionId);
    event BidWon(bytes32 indexed _auctionId, address indexed _debitUserAddress, address _creditUserAddress);
    
    // user struct
    
    struct User{
        bytes32 userId;
        address userAddress;
        uint role;
    }
    
    //auction struct
    
    struct Auction {
        bytes32 auctionId;
        uint256 bidStartTimestamp;
        uint256 bidEndTimestamp;
        bytes32 propertyId;
    }
    
    //bid struct
    
    struct Bid {
        bytes32 bidId;
        address userAddress;
        uint256 bidAmount;
        uint256 bidTimestamp;
    }
    
    //function to create the user
    
    function createUser(bytes32 _userId, address _userAddress, uint256 _balance, uint _role) public {
        User memory user = User({
            userId:_userId, userAddress: _userAddress, role: _role
        });
        
        userRegistry[_userAddress] = user;
        balanceRegistry[_userAddress] = _balance;
        _userRole[_userAddress] = Role(_role);
        emit UserCreated(_userId);
    }
    
    function registerWalletOfProperty(bytes32 _propertyId, address _userAddress) public {
        propertyAddressRegistry[_propertyId] = _userAddress;
    }
    
    function createAucton(bytes32 _auctionId, uint256 _bidStartTimestamp, uint256 _bidEndTimestamp, address[] memory _users, bytes32 _propertyId) public {
        Auction memory auction = Auction({auctionId: _auctionId, bidStartTimestamp: _bidStartTimestamp, bidEndTimestamp : _bidEndTimestamp, propertyId: _propertyId});
        
        for(uint i=0; i<_users.length; i++) {
            auctionSelectedUsers[_auctionId][_users[i]] = true;
        }
        
        auctionRegistry[_auctionId] = auction;
        emit AuctionCreated(_auctionId);
    }
    
    function placeBid(bytes32 _auctionId, bytes32 _bidId, uint256 _bidAmount) public {
        Auction memory auction = auctionRegistry[_auctionId];
        
        //check for the time 
        uint256 currentTimestamp = block.timestamp;
        
        require((auction.bidStartTimestamp <= currentTimestamp && auction.bidEndTimestamp >= currentTimestamp), "Bid time has passed for auction");
    
        //check if the creator of the auction is placing the Bid
        
        address trackUserAddress = propertyAddressRegistry[_auctionId];
        
        require((trackUserAddress != msg.sender), 'Holder of the property cannot place the bid');
        
        //check the balance
        
        require((balanceRegistry[msg.sender] >= _bidAmount), "wallet balance cannot less than bid amount");
        
        Bid memory bid = Bid({bidId : _bidId, userAddress : msg.sender, bidAmount: _bidAmount, bidTimestamp: currentTimestamp});
        
        bidRegistry[_bidId] = bid;
        
        auctionBidIdRegistry[_auctionId].push(_bidId);
        bidAuctionIdRegistry[_bidId] = _auctionId;
        
        emit BidPlaced(_bidId);
        
        
    }
    
    function registerWinningBid(bytes32 _auctionId, bytes32 _bidId) public {
        Auction memory auction = auctionRegistry[_auctionId];
        
        address trackUserAddress = propertyAddressRegistry[auction.propertyId];
        
        require((trackUserAddress == msg.sender), "Holder of the property can close the auction");
        
        winningBidRegistry[_auctionId] = _bidId;
        
        Bid memory bid = bidRegistry[_bidId];
        
        address debitUserAddress = bid.userAddress;
        bytes32 creditPropertyId = auctionRegistry[_auctionId].propertyId;
        
        address creditPropertyAddress = propertyAddressRegistry[creditPropertyId];
        
        balanceRegistry[debitUserAddress] =  balanceRegistry[debitUserAddress].sub(bid.bidAmount);
        balanceRegistry[creditPropertyAddress] = balanceRegistry[creditPropertyAddress].add(bid.bidAmount);
        emit BidWon(_auctionId, debitUserAddress, creditPropertyAddress);
        emit AuctionClosed(_auctionId);
    }
    
    function getWinningBid(bytes32 _auctionId) public returns(bytes32, bytes32, uint256) {
        bytes32 winningBidId = winningBidRegistry[_auctionId];
        
        Bid memory bid = bidRegistry[winningBidId];
        
        bytes32 auctionId = bidAuctionIdRegistry[winningBidId];
        
        Auction memory auction = auctionRegistry[auctionId];
        
        address propertyWalletAddress = propertyAddressRegistry[auction.propertyId];
        
        require((msg.sender == bid.userAddress || msg.sender == propertyWalletAddress), "winning bid can only seen by sender and track property");
        
        return(bid.bidId, userRegistry[bid.userAddress].userId, bid.bidAmount);
    }
    
    function getAuctionBids(bytes32 _auctionId) public returns(bytes32[] memory, uint256[] memory, uint256[] memory, address[] memory) {
        uint256 currentTimestamp = block.timestamp;
        
        Auction memory auction = auctionRegistry[_auctionId];
        
        address propertyWalletAddress = propertyAddressRegistry[auction.propertyId];
        
        require(msg.sender == propertyWalletAddress, "Bids can only be seen by track property");
        
        bytes32[] memory bidIds = auctionBidIdRegistry[_auctionId];
        uint256[] memory bidAmount = new uint256[](bidIds.length);
        uint256[] memory bidTimestamp = new uint256[](bidIds.length);
        address[] memory addresses = new address[](bidIds.length);
        
        
        for(uint i=0; i<bidIds.length; i++){
            Bid memory bid = bidRegistry[bidIds[i]];
            bidIds[i] = bid.bidId;
            bidAmount[i] = bid.bidAmount;
            bidTimestamp[i] = bid.bidTimestamp;
            addresses[i] = bid.userAddress;
        }
        
        return (bidIds, bidAmount, bidTimestamp, addresses);
    }
    
}

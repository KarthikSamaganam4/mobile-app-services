pragma solidity ^0.5.9;

contract User { 
    enum Role {member, owner, auctioner, DoesNotExist}

    // The hash of the username is mapped to he account address of a user
    mapping(bytes32 => address) private _userAccount;

    // account address of the user is mapped to the user role
    mapping(address => Role) private _userRole;
    mapping(address => bytes) private _username;

    function registerUser(string memory username, address account, uint role ) public {
        require(_userAccount[sha256(bytes(username))] == address(0) , "username already exists");
        //require(_userRole[account] == Role.DoesNotExist, "account already exists");

        _userAccount[sha256(bytes(username))] = account;
        _userRole[account] = Role(role);
        _username[account] = bytes(username);
    } 

    function getRole(address account) public view returns(uint) {
        return uint(_userRole[account]);
    }

    function getUserName(address account) public view returns(string memory) {
        return string(_username[account]);
    }

    function getAddressOfUser(string memory username) public view returns (address) {
        return _userAccount[sha256(bytes(username))];
    }
}

contract AuctionFlow { 
    
    function getName() public view returns (string memory) {
        return "krk";
    }
    
}
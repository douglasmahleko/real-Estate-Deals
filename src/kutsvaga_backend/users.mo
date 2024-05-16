import Bool "mo:base/Bool";
import Text "mo:base/Text";
import Principal "mo:base/Principal";

module {

    public type User = {
    principleId: Principal;
    title : Text;
    name : Text;
    surname: Text;
    email : Text;
    contact : Text;
    dob :  Text;
    gender : Text;
    country : Text;
    registered : Bool;
    level : AccessLevel;
    regDate : Text;
    done : Bool
  };
  public type UserUnOfficial = {
    title : Text;
    name : Text;
    surname: Text;
    email : Text;
    contact : Text;
    dob :  Text;
    gender : Text;
    country : Text;
    registered : Bool;
    level : AccessLevel;
    regDate : Text;
  };
  public type UserUpdateUnOfficial = {
    title : Text;
    name : Text;
    surname: Text;
    email : Text;
    contact : Text;
    dob :  Text;
    gender : Text;
    country : Text;
    registered : Bool;
    level : AccessLevel;
    regDate : Text;
    done:Bool;
  };

  public type AccessLevel = {
    #AGENT;
    #CLIENT;
  };

  public type Agent = {
    principleIdAgent: Principal;
    email : Text;
    physicalAddress : Text;
    city : Text;
    province : Text;
    phase : Text;
    regExpire : Text;
  };
  public type AgentUnOfficial = {
    email : Text;
    physicalAddress : Text;
    city : Text;
    province : Text;
    phase : Text;
    regExpire : Text;
  };
  public type AgentUpdateUnOfficial = {
    email : Text;
    physicalAddress : Text;
    city : Text;
    province : Text;
    phase : Text;
    regExpire : Text;
  };
  public type Payments = {
    email : Text;
    principleId : Principal;
    receiverAddress: Text;
    myAddress:Text;
    receiverEmail : Text;
    amount : Float;
    purpose : Text;
    valid : Bool;
    datePaymentMade :Text;
  };
  public type PaymentsUnOfficial = {
    email : Text;
    receiverAddress: Text;
    myAddress:Text;
    receiverEmail : Text;
    amount : Float;
    purpose : Text;
    datePaymentMade : Text
  };
}

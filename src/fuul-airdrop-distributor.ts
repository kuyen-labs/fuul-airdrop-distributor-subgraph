import { Claimed as ClaimedEvent } from "../generated/templates/FuulAirdropDistributor/FuulAirdropDistributor";
import { Distributor, User, UserBalance } from "../generated/schema";
import { BigInt } from "@graphprotocol/graph-ts";

export function handleClaimed(event: ClaimedEvent): void {
  const distributorId = event.transaction.to;
  const userId = event.params.account;

  if (!distributorId) {
    throw new Error("Could not determine distributorId");
  }

  const distributor = Distributor.load(distributorId);
  if (!distributor) {
    throw new Error(
      `Distributor id ${distributorId.toHexString()} could not be loaded`
    );
  }

  if (!User.load(userId)) {
    const user = new User(userId);
    user.save();
  }

  distributor.totalClaims.plus(BigInt.fromI32(1));
  distributor.claimedAmount.plus(event.params.claimedAmount);

  const userBalanceId = `${distributorId.toHexString()}-${userId.toHexString()}`;
  let userBalance = UserBalance.load(userBalanceId);
  if (!userBalance) {
    userBalance = new UserBalance(userBalanceId);
    userBalance.user = userId;
    userBalance.distributor = distributorId;
    userBalance.claimedAmount = event.params.claimedAmount;

    distributor.participants.plus(BigInt.fromI32(1));
  } else {
    userBalance.claimedAmount.plus(event.params.claimedAmount);
  }

  distributor.save();

  userBalance.save();
}

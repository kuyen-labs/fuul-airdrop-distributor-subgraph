import { Claimed as ClaimedEvent } from "../generated/templates/FuulAirdropDistributor/FuulAirdropDistributor";
import { ClaimingWithoutStakingPercentagePenaltyUpdated } from "../generated/templates/FuulAirdropDistributor/FuulAirdropDistributor";
import { StakingDurationPenaltyUpdated } from "../generated/templates/FuulAirdropDistributorWithDuration/FuulAirdropDistributorWithDuration";
import {
  Distributor,
  DurationPenalty,
  User,
  UserBalance,
} from "../generated/schema";
import { BigInt } from "@graphprotocol/graph-ts";

export function handleClaimed(event: ClaimedEvent): void {
  const distributorId = event.transaction.to;
  const userId = event.params.account;

  if (!distributorId) {
    throw new Error("Could not determine distributorId");
  }

  const distributor = Distributor.load(distributorId);
  if (!distributor) {
    throw new Error(`Could not load Distributor${distributorId.toHexString()}`);
  }

  if (!User.load(userId)) {
    const user = new User(userId);
    user.save();
  }

  distributor.totalClaims = distributor.totalClaims.plus(BigInt.fromI32(1));
  distributor.claimedAmount = distributor.claimedAmount.plus(
    event.params.claimedAmount
  );
  distributor.amount = distributor.amount.plus(event.params.amount);

  const userBalanceId = `${distributorId.toHexString()}-${userId.toHexString()}`;
  let userBalance = UserBalance.load(userBalanceId);
  if (!userBalance) {
    userBalance = new UserBalance(userBalanceId);
    userBalance.user = userId;
    userBalance.distributor = distributorId;
    userBalance.claimedAmount = event.params.claimedAmount;
    userBalance.amount = event.params.amount;

    distributor.participants = distributor.participants.plus(BigInt.fromI32(1));
  } else {
    userBalance.claimedAmount = userBalance.claimedAmount.plus(
      event.params.claimedAmount
    );
    userBalance.amount = userBalance.amount.plus(event.params.amount);
  }

  distributor.save();

  userBalance.save();
}

export function handleClaimingWithoutStakingPercentagePenaltyUpdated(
  event: ClaimingWithoutStakingPercentagePenaltyUpdated
): void {
  const distributorId = event.transaction.to;
  if (!distributorId) {
    throw new Error("Could not determine distributorId");
  }

  const distributor = Distributor.load(distributorId);
  if (!distributor) {
    throw new Error(
      `Could not load Distributor ${distributorId.toHexString()}`
    );
  }

  distributor.claimingWithoutStakingPercentagePenalty = event.params.newPenalty;
  distributor.save();
}

export function handleStakingDurationPenaltyUpdated(
  event: StakingDurationPenaltyUpdated
): void {
  const distributorId = event.transaction.to;
  if (!distributorId) {
    throw new Error("Could not determine distributorId");
  }

  const durationFeeId = `${distributorId
    .toHexString()
    .toLowerCase()}-${event.params.duration.toString()}`;

  const durationPenalty = DurationPenalty.load(durationFeeId);
  if (!durationPenalty) {
    throw new Error(`Could not load DurationPenalty ${durationFeeId}`);
  }

  durationPenalty.penalty = event.params.newPenalty;
  durationPenalty.enabled = event.params.isEnabled;

  durationPenalty.save();
}

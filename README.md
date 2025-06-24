# Fuul Airdrop Distributor subgraphs

## Example queries

```graphql
query {
  distributors {
    id
    participants
    totalClaims
    userBalances {
      id
      user {
        id
      }
      claimedAmount
    }
  }
}
```


```graphql
query {
  userBalances {
    id
    distributor {
      id
    }
    user {
      id
    }
    claimedAmount
  }
}
```


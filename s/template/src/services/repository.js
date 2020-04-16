export default class Repository {
  constructor (deps) {
    const { apollo, gql } = deps
    this.$apollo = apollo
    this.$gql = gql
  }

  async fetchItems ({ pagination, filter }) {
    let { page, prevPage, rowsPerPage, info } = pagination
    const fetchCount = rowsPerPage > 0 ? rowsPerPage : 100
    const params = {
      number_of_repos: fetchCount
    }
    if (page !== prevPage && info) {
      if (page > prevPage) {
        params.after = info.endCursor
      } else {
        params.before = info.startCursor
      }
    }

    let items = []
    let newPagination = {
      page,
      prevPage: page,
      rowsPerPage
    }
    if (filter) {
      params.query = `name:${filter}`
      items = await this._search(params)
      newPagination.rowsNumber = items.repositoryCount
    } else {
      items = await this._fetchAll(params)
      newPagination.rowsNumber = items.totalCount
    }
    newPagination.info = items.pageInfo

    return {
      items: items.edges,
      pagination: newPagination
    }
  }

  async _fetchAll (params) {
    const { data } = await this.$apollo.query({
      query: this.$gql`query
        GetRepositories($before: String, $after: String, $number_of_repos: Int!) {
          viewer {
            starredRepositories(before: $before after: $after first: $number_of_repos) {
              pageInfo {
                startCursor
                endCursor
                hasNextPage
                hasPreviousPage
              }
              totalCount
              edges {
                cursor
                node {
                  name
                  nameWithOwner
                  description
                  url
                  owner {
                    avatarUrl
                    login
                  }
                  stargazers {
                    totalCount
                  }
                  languages(last: $number_of_repos) {
                    nodes {
                      name
                    }
                  }
                }
              }
            }
          }
      }`,
      variables: params
    })
    return data.viewer.starredRepositories
  }

  async _search (params) {
    const { data } = await this.$apollo.query({
      query: this.$gql`query ($before: String, $after: String, $number_of_repos: Int!, $query: String!) {
        search(type: REPOSITORY, query: $query, before: $before, after: $after, first: $number_of_repos) {
          pageInfo {
            startCursor
            endCursor
            hasNextPage
            hasPreviousPage
          }
          repositoryCount
          edges {
            cursor
            node {
              ... on Repository {
                name
                description
                url
                owner {
                  avatarUrl
                  login
                }
                stargazers {
                  totalCount
                }
                languages(last: $number_of_repos) {
                  nodes {
                    name
                  }
                }
              }
            }
          }
        }
      }`,
      variables: params
    })
    return data.search
  }

  async fetchOne (params) {
    const { data } = await this.$apollo.query({
      query: this.$gql`query ($owner: String! $name: String!) {
        repository(owner: $owner name: $name) {
          id
          name
          nameWithOwner
          description
          owner {
            avatarUrl
            login
          }
          stargazers {
            totalCount
          }
          languages(first: 100) {
            nodes {
              name
            }
          }
        }
      }`,
      variables: params
    })
    return data.repository
  }

  async removeStar (params) {
    const { data } = await this.$apollo.mutate({
      mutation: this.$gql`mutation ($payload: RemoveStarInput!) {
        removeStar(input: $payload) {
          starrable {
            stargazers {
              totalCount
            }
          }
        }
      }`,
      variables: {
        payload: params
      }
    })
    return data.removeStar
  }
}

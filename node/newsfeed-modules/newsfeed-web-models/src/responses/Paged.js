class Paged {
  constructor(data, pageIndex, pagesize, totalcount) {
    this.pageIndex = pageIndex;
    this.pageSize = pagesize;
    this.pagedItems = data;

    this.totalCount = totalcount;
    this.totalPages = Math.ceil(totalcount / pagesize);

    this.hasPreviousPage = this.pageIndex > 0;

    this.hasNextPage = this.pageIndex + 1 < this.totalPages;
  }
}

module.exports = Paged;

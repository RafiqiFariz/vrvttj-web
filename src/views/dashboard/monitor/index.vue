<script setup lang="ts">
import Chart from './components/chart.vue'
import Chart2 from './components/chart2.vue'
import Chart3 from './components/chart3.vue'

const tableData = [
  {
    id: 0,
    name: '商品名称1',
    start: '2022-02-02',
    end: '2022-02-02',
    prograss: '100',
    status: '已完成',
  },
  {
    id: 0,
    name: '商品名称2',
    start: '2022-02-02',
    end: '2022-02-02',
    prograss: '50',
    status: '交易中',
  },
  {
    id: 0,
    name: '商品名称3',
    start: '2022-02-02',
    end: '2022-02-02',
    prograss: '100',
    status: '已完成',
  },
]
</script>

<template>
  <div>
    <n-grid
      :x-gap="16"
      :y-gap="16"
    >
      <n-gi :span="6">
        <n-card>
          <n-space
            justify="space-between"
            align="center"
          >
            <n-statistic label="Mahasiswa">
              <n-number-animation
                :from="0"
                :to="200"
                show-separator
              />
            </n-statistic>
            <n-icon
              color="#de4307"
              size="42"
            >
              <icon-park-outline-bachelor-cap />
            </n-icon>
          </n-space>
        </n-card>
      </n-gi>
      <n-gi :span="6">
        <n-card>
          <n-space
            justify="space-between"
            align="center"
          >
            <n-statistic label="Jenis Tari">
              <n-number-animation
                :from="0"
                :to="12"
                show-separator
              />
            </n-statistic>
            <n-icon
              color="#ffb549"
              size="42"
            >
              <icon-park-outline-chart-graph />
            </n-icon>
          </n-space>
        </n-card>
      </n-gi>
      <n-gi :span="6">
        <n-card>
          <n-space
            justify="space-between"
            align="center"
          >
            <n-statistic label="Gerak Tari">
              <n-number-animation
                :from="0"
                :to="60"
                show-separator
              />
            </n-statistic>
            <n-icon
              color="#1687a7"
              size="42"
            >
              <icon-park-outline-average />
            </n-icon>
          </n-space>
        </n-card>
      </n-gi>
      <n-gi :span="6">
        <n-card>
          <n-space
            justify="space-between"
            align="center"
          >
            <n-statistic label="Busana Tari">
              <n-number-animation
                :from="0"
                :to="20"
                show-separator
              />
            </n-statistic>
            <n-icon
              color="#42218E"
              size="42"
            >
              <icon-park-outline-chart-pie />
            </n-icon>
          </n-space>
        </n-card>
      </n-gi>
      <n-gi :span="24">
        <n-card content-style="padding: 0;">
          <n-tabs
            type="line"
            size="large"
            :tabs-padding="20"
            pane-style="padding: 20px;"
          >
            <n-tab-pane name="Chart 1">
              <Chart />
            </n-tab-pane>
            <n-tab-pane name="Chart 2">
              <Chart2 />
            </n-tab-pane>
          </n-tabs>
        </n-card>
      </n-gi>
    </n-grid>
  </div>
</template>

<style scoped></style>

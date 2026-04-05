/**
 * Преобразует кластеры в формат для карты
 */
export const adaptClustersToMapData = (clusters) => {
  if (!clusters?.length) return [];

  return clusters.map((cluster) => ({
    id: cluster.id,
    name: "",
    lng: cluster.longitude,
    lat: cluster.latitude,
    requests: cluster.totalRequests,
    // Сохраняем оригинальные данные для деталей
    _details: {
      addresses: cluster.addresses,
      addressesCount: cluster.addressesCount,
    },
  }));
};

/**
 * Преобразует отдельные адреса в формат для карты
 */
export const adaptAddressesToMapData = (addresses) => {
  if (!addresses?.length) return [];

  return addresses.map((address) => ({
    id: address.id,
    name: `${address.street}, ${address.houseNumber}`,
    lng: address.longitude,
    lat: address.latitude,
    requests: address.requestsCount,
    _details: {
      street: address.street,
      houseNumber: address.houseNumber,
      requests: address.requests,
    },
  }));
};

/**
 * Основная функция адаптации
 */
export const adaptMapData = (backendData, zoomLevel) => {
  if (!backendData) return [];

  // На большом зуме показываем отдельные адреса
  if (zoomLevel >= 15 && backendData.points?.length) {
    return adaptAddressesToMapData(backendData.points);
  }

  // Иначе показываем кластеры
  return adaptClustersToMapData(backendData.clusters);
};

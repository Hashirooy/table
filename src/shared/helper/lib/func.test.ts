import { describe, it, expect } from "vitest";
import { filteredFunc } from "./serach";
import type { User } from "../../../entities/User/model/types/userSchema";
import { sortFunc } from "./sort";
import type { Order } from "../../ui/Table/type";
import { filteredByStatusFunc } from "./filter";

describe("filteredFunc", () => {
  it("Результат поиска по  зашлавному символу", () => {
    const data: User[] = [
      { properties: { name: "John", email: "john@example.com" } },
      { properties: { name: "Jane", email: "jane@example.com" } },
    ];
    const result = filteredFunc(data, "J");
    expect(result).toEqual(data);
  });

  it("Результат поиска по строчному символу", () => {
    const data: User[] = [
      { properties: { name: "John", email: "john@example.com" } },
      { properties: { name: "Jane", email: "jane@example.com" } },
    ];
    const result = filteredFunc(data, "j");

    expect(result).toEqual(data);
  });

  it("Поиск по имени", () => {
    const data: User[] = [
      { properties: { name: "John", email: "john@example.com" } },
      { properties: { name: "Jane", email: "jane@example.com" } },
    ];
    const result = filteredFunc(data, "John");
    expect(result[0].properties).toEqual({
      name: "John",
      email: "john@example.com",
    });
  });
  it("Поиск по еемеил", () => {
    const data: User[] = [
      { properties: { name: "John", email: "john@example.com" } },
      { properties: { name: "Jane", email: "jane@example.com" } },
    ];
    const result = filteredFunc(data, "jane@example.com");
    expect(result[0].properties).toEqual({
      name: "Jane",
      email: "jane@example.com",
    });
  });
  it("Таблица заказов поиск по заказу", () => {
    const data: Order[] = [
      { properties: { order: "123", customer: "John", product: "Product 1" } },
      { properties: { order: "456", customer: "Jane", product: "Product 2" } },
    ];
    const result = filteredFunc(data, "123");
    expect(result[0].properties).toEqual({
      order: "123",
      customer: "John",
      product: "Product 1",
    });
  });
  it("Таблица заказов поиск по customer", () => {
    const data: Order[] = [
      { properties: { order: "123", customer: "John", product: "Product 1" } },
      { properties: { order: "456", customer: "Jane", product: "Product 2" } },
    ];
    const result = filteredFunc(data, "Jane");
    expect(result[0].properties).toEqual({
      order: "456",
      customer: "Jane",
      product: "Product 2",
    });
  });
  it("Таблица заказов поиск по product", () => {
    const data: Order[] = [
      { properties: { order: "123", customer: "John", product: "Product 1" } },
      { properties: { order: "456", customer: "Jane", product: "Product 2" } },
    ];
    const result = filteredFunc(data, "Product 2");
    expect(result[0].properties).toEqual({
      order: "456",
      customer: "Jane",
      product: "Product 2",
    });
  });
});

describe("sortFunc", () => {
  it("Сортировка по возрастанию", () => {
    const data: User[] = [
      { properties: { name: "John", email: "john@example.com" } },
      { properties: { name: "Jane", email: "jane@example.com" } },
    ];
    const result = sortFunc(data, "name", "asc");
    expect(result).toEqual([
      { properties: { name: "Jane", email: "jane@example.com" } },
      { properties: { name: "John", email: "john@example.com" } },
    ]);
  });
  it("Сортировка по убыванию", () => {
    const data: User[] = [
      { properties: { name: "John", email: "john@example.com" } },
      { properties: { name: "Jane", email: "jane@example.com" } },
    ];
    const result = sortFunc(data, "name", "desc");
    expect(result).toEqual([
      { properties: { name: "John", email: "john@example.com" } },
      { properties: { name: "Jane", email: "jane@example.com" } },
    ]);
  });
});

describe("filteredByStatusFunc", () => {
  it("Филтрация по статусу", () => {
    const data: User[] = [
      {
        properties: {
          name: "John",
          email: "john@example.com",
          status: "active",
        },
      },
      {
        properties: {
          name: "Jane",
          email: "jane@example.com",
          status: "inactive",
        },
      },
    ];
    const result = filteredByStatusFunc(data, "inactive");
    expect(result).toEqual([
      {
        properties: {
          name: "Jane",
          email: "jane@example.com",
          status: "inactive",
        },
      },
    ]);
  });
  it("Филтрация по статусу", () => {
    const data: User[] = [
      {
        properties: {
          name: "John",
          email: "john@example.com",
          status: "active",
        },
      },
      {
        properties: {
          name: "Jane",
          email: "jane@example.com",
          status: "inactive",
        },
      },
    ];

    const result = filteredByStatusFunc(data, "active");
    expect(result).toEqual([
      {
        properties: {
          name: "John",
          email: "john@example.com",
          status: "active",
        },
      },
    ]);
  });
  it("Филтрация по статусу нет статуса", () => {
    const data: User[] = [
      {
        properties: {
          name: "John",
          email: "john@example.com",
          status: "active",
        },
      },
      {
        properties: {
          name: "Jane",
          email: "jane@example.com",
          status: "inactive",
        },
      },
    ];
    const result = filteredByStatusFunc(data, "");
    expect(result).toEqual(data);
  });
});

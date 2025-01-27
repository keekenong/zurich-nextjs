import axios from "axios";
import { axiosCall } from "./api"; // Update with the correct path

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("axiosCall", () => {
    const mockUrl = "https://api.example.com/resource";
    const mockResponse = { data: { success: true } };

    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetModules();
    });

    it("should make a GET request and return data", async () => {
        mockedAxios.request.mockResolvedValueOnce(mockResponse);

        const result = await axiosCall("GET", mockUrl);

        expect(mockedAxios).toHaveBeenCalledWith(
            expect.objectContaining({
                method: "GET",
                url: mockUrl,
                headers: expect.objectContaining({ "Content-Type": "application/json" }),
            })
        );
        expect(result).toEqual(mockResponse.data);
    });

    it("should make a POST request with body and return data", async () => {
        const mockBody = { key: "value" };
        mockedAxios.request.mockResolvedValueOnce(mockResponse);

        const result = await axiosCall("POST", mockUrl, undefined, mockBody);

        expect(mockedAxios).toHaveBeenCalledWith(
            expect.objectContaining({
                method: "POST",
                url: mockUrl,
                data: mockBody,
            })
        );
        expect(result).toEqual(mockResponse.data);
    });

    it("should merge custom headers with default headers", async () => {
        const customHeaders = { Authorization: "Bearer token" };
        mockedAxios.request.mockResolvedValueOnce(mockResponse);

        await axiosCall("GET", mockUrl, customHeaders);

        expect(mockedAxios).toHaveBeenCalledWith(
            expect.objectContaining({
                headers: expect.objectContaining({
                    "Content-Type": "application/json",
                    Authorization: "Bearer token",
                }),
            })
        );
    });

    it("should handle query parameters", async () => {
        const mockParams = { search: "query" };
        mockedAxios.request.mockResolvedValueOnce(mockResponse);

        await axiosCall("GET", mockUrl, undefined, undefined, mockParams);

        expect(mockedAxios).toHaveBeenCalledWith(
            expect.objectContaining({
                params: mockParams,
            })
        );
    });

    it("should throw an error on failure", async () => {
        const mockError = new Error("Request failed");
        mockedAxios.request.mockRejectedValueOnce(mockError);

        await expect(axiosCall("GET", mockUrl)).rejects.toThrow(new Error("Request failed"));

        expect(mockedAxios).toHaveBeenCalledWith(
            expect.objectContaining({
                method: "GET",
                url: mockUrl,
            })
        );
    });
});
